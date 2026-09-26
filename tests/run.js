import assert from "node:assert";
import { padNumber } from "../pad.js";
import { addNumbers } from "../number.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("padNumber returns text", () => {
  assert.strictEqual(typeof padNumber(1, 2), "string");
});

check("addNumbers returns a list", () => {
  assert.ok(Array.isArray(addNumbers(["a"], 2)));
});

check("addNumbers keeps count", () => {
  assert.strictEqual(addNumbers(["a", "b"], 2).length, 2);
});

check("render counts lines", () => {
  assert.strictEqual(typeof render({ lines: ["a"], digits: 2 }).count, "number");
});

check("render exposes overflow count", () => {
  assert.strictEqual(typeof render({ lines: ["a"], digits: 2 }).overflow_count, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
