// pad.js：补行号（空格右对齐到位宽；行号位数超过位宽时按实际位数给）
export function padNumber(index, digits) {
  if (!(digits >= 1)) {
    const error = new Error("digits must be at least 1");
    error.code = "E_BAD_LINE";
    throw error;
  }
  return String(index).padStart(digits, " ");
}
