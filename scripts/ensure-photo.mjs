import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photo = join(root, "public/images/alfred.jpg");
const encoded = join(root, "public/images/alfred.jpg.b64");
const imagesDir = join(root, "public/images");

if (existsSync(photo)) {
  process.exit(0);
}

let b64 = "";
if (existsSync(encoded)) {
  b64 = readFileSync(encoded, "utf8");
} else {
  const parts = readdirSync(imagesDir)
    .filter((name) => name.startsWith("alfred.jpg.b64.part"))
    .sort();
  if (parts.length === 0) {
    process.exit(0);
  }
  b64 = parts.map((name) => readFileSync(join(imagesDir, name), "utf8")).join("");
}

mkdirSync(dirname(photo), { recursive: true });
writeFileSync(photo, Buffer.from(b64, "base64"));
