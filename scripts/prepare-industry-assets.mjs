import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, normalize } from "node:path";
import { gunzipSync } from "node:zlib";

const root = process.cwd();
const archive = join(root, "assets", "industry-images.tar.gz");

if (!existsSync(archive)) {
  console.warn("[industry-assets] assets/industry-images.tar.gz is not present; keeping the current public industry assets unchanged.");
  process.exit(0);
}

function readTarString(buffer, start, length) {
  return buffer.subarray(start, start + length).toString("utf8").replace(/\0.*$/s, "").trim();
}

function readOctal(buffer, start, length) {
  const value = readTarString(buffer, start, length).replace(/[^0-7]/g, "");
  return value ? Number.parseInt(value, 8) : 0;
}

const tar = gunzipSync(readFileSync(archive));
let offset = 0;
let extracted = 0;
while (offset + 512 <= tar.length) {
  const header = tar.subarray(offset, offset + 512);
  if (header.every((byte) => byte === 0)) break;

  const name = readTarString(header, 0, 100);
  const prefix = readTarString(header, 345, 155);
  const archivePath = normalize(prefix ? prefix + "/" + name : name).replaceAll("\\", "/");
  const size = readOctal(header, 124, 12);
  const type = String.fromCharCode(header[156] || 48);
  const dataStart = offset + 512;
  const dataEnd = dataStart + size;

  if (type === "0" || type === "\0") {
    const safePath = resolve(root, archivePath);
    const expectedPrefix = resolve(root, "public", "industries") + "/";
    if (
      safePath.startsWith(expectedPrefix) &&
      (safePath.endsWith(".webp") || safePath.endsWith("manifest.json")) &&
      dataEnd <= tar.length
    ) {
      mkdirSync(join(safePath, ".."), { recursive: true });
      writeFileSync(safePath, tar.subarray(dataStart, dataEnd));
      extracted += 1;
    }
  }
  offset = dataStart + Math.ceil(size / 512) * 512;
}
if (extracted !== 56) {
  console.warn("[industry-assets] Expected 55 WebP images plus manifest; extracted " + extracted + " assets.");
} else {
  console.log("[industry-assets] Prepared 55 default industry images and manifest in public/industries.");
}
