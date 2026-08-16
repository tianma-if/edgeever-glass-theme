import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("manifest follows EdgeEver plugin API v1", async () => {
  const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));

  assert.equal(manifest.type, "plugin");
  assert.match(manifest.id, /^[a-z0-9][a-z0-9._-]+$/);
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.equal(manifest.apiVersion, "1");
  assert.equal(manifest.entry, "./main.js");
  assert.deepEqual(manifest.permissions, []);
  assert.deepEqual(manifest.platforms, ["web", "desktop"]);
});

test("activation adds the scope marker and cleanup removes it", async () => {
  const attributes = new Map();
  globalThis.document = {
    documentElement: {
      setAttribute: (name, value) => attributes.set(name, value),
      getAttribute: (name) => attributes.get(name) ?? null,
      removeAttribute: (name) => attributes.delete(name),
    },
  };

  const { default: plugin } = await import(new URL("main.js", root));
  const deactivate = plugin.activate();

  assert.equal(attributes.get("data-edgeever-glass-theme"), "active");
  assert.equal(typeof deactivate, "function");
  deactivate();
  assert.equal(attributes.has("data-edgeever-glass-theme"), false);

  delete globalThis.document;
});

test("stylesheet is scoped and includes real translucent glass plus accessibility fallbacks", async () => {
  const css = await readFile(new URL("styles.css", root), "utf8");

  assert.match(css, /html\[data-edgeever-glass-theme="active"\]/);
  assert.match(css, /--glass-surface:/);
  assert.match(css, /--glass-overlay:/);
  assert.match(css, /feTurbulence/);
  assert.match(css, /Segoe UI Variable/);
  assert.match(css, /\[role="tooltip"\][^{]*\{[^}]*background:[^;]*--glass-tooltip[^}]*color:[^;]*--glass-tooltip-text/s);
  assert.match(css, /backdrop-filter:\s*blur/);
  assert.match(css, /@supports not/);
  assert.match(css, /prefers-reduced-transparency/);
  assert.match(css, /html\.dark/);
});
