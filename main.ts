import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My cat watches me code like a senior dev reviewing my work — silent, unimpressed, and somehow always right about the bug.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Entry must be a single line with no newline characters");
}
if (LINE.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Round-trip self-check: the file on disk must be byte-identical to LINE.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match LINE");
}
console.log(`Wrote ${LINE.length} characters to ${join(outDir, "entry.txt")}`);
