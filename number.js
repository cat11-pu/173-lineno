// number.js：批量加号（一次扫描，每行只拼一次）
import { padNumber } from "./pad.js";

export function addNumbers(lines, digits) {
  if (!(digits >= 1)) {
    const error = new Error("digits must be at least 1");
    error.code = "E_BAD_LINE";
    throw error;
  }
  const numbered = new Array(lines.length);
  for (let spot = 0; spot < lines.length; spot += 1) {
    if (lines[spot].indexOf("\t") !== -1) {
      const error = new Error("line must not contain tabs");
      error.code = "E_BAD_LINE";
      throw error;
    }
    numbered[spot] = padNumber(spot + 1, digits) + ": " + lines[spot];
  }
  return numbered;
}
