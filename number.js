// number.js：批量加号（行号从一数，单次扫描，每行只拼一次）
import { padNumber } from "./pad.js";

export function addNumbers(lines, digits) {
  if (!Number.isInteger(digits) || digits < 1) {
    const error = new Error("digits must be an integer >= 1, got " + digits);
    error.code = "E_BAD_LINE";
    throw error;
  }
  const out = new Array(lines.length);
  for (let spot = 0; spot < lines.length; spot += 1) {
    const content = lines[spot];
    if (content.indexOf("\t") !== -1) {
      const error = new Error("line " + (spot + 1) + " contains a tab");
      error.code = "E_BAD_LINE";
      throw error;
    }
    out[spot] = padNumber(spot + 1, digits) + ": " + content;
  }
  return out;
}
