// app.js：渲染结果
import { padNumber } from "./pad.js";
import { addNumbers } from "./number.js";

export function render(spec) {
  const lines = spec.lines || [];
  const digits = spec.digits === undefined ? 1 : spec.digits;
  const numbered = addNumbers(lines, digits);
  const overflow = [];
  numbered.forEach((line, spot) => {
    if (padNumber(spot + 1, digits).length > digits) overflow.push(spot);
  });
  return { numbered: numbered, overflow: overflow, overflow_count: overflow.length,
           count: numbered.length, digits: digits,
           longest: numbered.reduce((best, item) => Math.max(best, item.length), 0) };
}
