import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("dist/", projectRoot);
const releaseFiles = ["manifest.json", "main.js", "styles.css"];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const checksums = [];
for (const file of releaseFiles) {
  const contents = await readFile(new URL(file, projectRoot));
  await writeFile(new URL(file, outputRoot), contents);
  checksums.push(`${createHash("sha256").update(contents).digest("hex")}  ${file}`);
}

await writeFile(new URL("SHA256SUMS", outputRoot), `${checksums.join("\n")}\n`);
console.log(`Packaged ${releaseFiles.length} EdgeEver assets in dist/.`);
