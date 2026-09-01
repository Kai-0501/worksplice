import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photo = join(root, "public/images/alfred.jpg");
const encoded = join(root, "public/images/alfred.jpg.b64");

if (existsSync(photo) || !existsSync(encoded)) {
  process.exit(0);
}

mkdirSync(dirname(photo), { recursive: true });
writeFileSync(photo, Buffer.from(readFileSync(encoded, "utf8"), "base64"));
