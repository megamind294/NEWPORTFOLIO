import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("production build exposes a static homepage and public assets for Hostinger", async () => {
  await access("dist/index.html");
  await access("dist/_next/static");
  await access("dist/projects/local-ai-security-workspace.webp");
  await access("dist/Rinkle_Sharma_Resume.pdf");

  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /Rinkle Sharma/);
  assert.match(html, /\/_next\/static\//);
});
