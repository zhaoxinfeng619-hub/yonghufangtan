import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the insurance sales workbench", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>守护台｜保险销售 AI 工作台<\/title>/i);
  assert.match(html, /首页数据看板/);
  assert.match(html, /对话工作台/);
  assert.match(html, /待办与跟进任务/);
  assert.match(html, /今日待处理/);
  assert.match(html, /今天的销售小助手/);
  assert.match(html, /保险产品与条款/);
  assert.match(html, /后续/);
});

test("server-rendered workbench contains only planned placeholder entries", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /线索池/);
  assert.match(html, /客户管理/);
  assert.match(html, /AI员工配置/);
  assert.match(html, /合规规则配置/);
  assert.ok((html.match(/后续/g) ?? []).length >= 10);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/);
});
