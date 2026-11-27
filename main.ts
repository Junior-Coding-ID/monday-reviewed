// Monday, Reviewed in One Line — entry writer.
// Writes the final one-line Monday review verbatim to <output-dir>/entry.txt.
// Output dir comes from the OUTPUT_DIR env var, defaulting to /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My Monday gets one star: I stepped off the train to let a guy out, and the doors took his side.";

const outputDir = process.env.OUTPUT_DIR || "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), TEXT, "utf8");

// Verify what was written: exact bytes, single line, within the 200-char gate.
const written = readFileSync(join(outputDir, "entry.txt"), "utf8");
if (written !== TEXT) {
  throw new Error("entry.txt does not match the final text byte for byte");
}
if (TEXT.length > 200 || TEXT.includes("\n")) {
  throw new Error("final text violates the gate (over 200 chars or not one line)");
}
console.log(`wrote entry.txt (${TEXT.length} chars) to ${outputDir}`);
