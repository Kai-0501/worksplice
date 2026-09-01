import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lockfile = join(root, "package-lock.json");

if (existsSync(lockfile)) {
  process.exit(0);
}

const parts = readdirSync(root)
  .filter((name) => name.startsWith("package-lock.json.part"))
  .sort();

if (parts.length === 0) {
  process.exit(0);
}

writeFileSync(
  lockfile,
  parts.map((name) => readFileSync(join(root, name), "utf8")).join(""),
);
