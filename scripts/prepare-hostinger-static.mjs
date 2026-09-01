import { cp, copyFile, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const buildRoot = "dist";
const clientRoot = join(buildRoot, "client");
const prerenderRoot = join(buildRoot, "server", "prerendered-routes");

for (const entry of await readdir(clientRoot, { withFileTypes: true })) {
  await cp(join(clientRoot, entry.name), join(buildRoot, entry.name), {
    recursive: entry.isDirectory(),
    force: true,
  });
}

await mkdir(clientRoot, { recursive: true });
await copyFile(join(prerenderRoot, "index.html"), join(buildRoot, "index.html"));
await copyFile(join(prerenderRoot, "index.html"), join(clientRoot, "index.html"));
await copyFile(join(prerenderRoot, "404.html"), join(buildRoot, "404.html"));
await copyFile(join(prerenderRoot, "404.html"), join(clientRoot, "404.html"));
