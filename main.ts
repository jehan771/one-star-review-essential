// One-star review of something essential (make.fun program/v1).
// Writes exactly one line — a deadpan one-star review of sleep — to
// /output/entry.txt. The text is a fixed string: the program takes no
// input, reads nothing from the environment, and writes the same bytes
// on every run.

import { mkdirSync, writeFileSync } from "node:fs";

const REVIEW =
  "Eight hours of sleep, and I wake up tired. Refund policy unclear.";
const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

// The gate: /output/entry.txt must be UTF-8 text of 1 to 160
// characters, not only white space. Fail loudly instead of writing a
// file the gate would refuse.
function checkReview(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `review must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("review must be a single line");
  }
}

checkReview(REVIEW);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, REVIEW, "utf8");
