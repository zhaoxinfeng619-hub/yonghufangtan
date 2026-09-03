import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = new URL("../dist/client/", import.meta.url);
const prefix = "/yonghufangtan";

async function visit(directory) {
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry);
    const info = await stat(path);
    if (info.isDirectory()) {
      await visit(path);
      continue;
    }

    // Vinext emits some client-side CSS preloads with an absolute /_next path.
    // That path works at the domain root but not when the site is hosted from a
    // GitHub Pages project subpath. Rewrite only unprefixed references in text
    // assets; already-correct URLs remain unchanged.
    const extension = path.split(".").pop();
    if (!extension || !["html", "js", "css", "rsc", "json"].includes(extension)) continue;
    const source = await readFile(path, "utf8");
    const fixed = source
      .replace(/(?<!yonghufangtan)\/_next\//g, `${prefix}/_next/`)
      // Vite stores lazy dependency URLs without a leading slash in its
      // preload map; make those absolute within the project as well.
      .replace(/(["'`])_next\/static\//g, `$1${prefix}/_next/static/`);
    if (fixed !== source) await writeFile(path, fixed);
  }
}

await visit(fileURLToPath(root));
