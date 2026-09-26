// pad.js：补行号（空格右对齐补到位宽，超出位宽按实际位数给）
export function padNumber(index, digits) {
  if (!Number.isInteger(digits) || digits < 1) {
    const error = new Error("digits must be an integer >= 1, got " + digits);
    error.code = "E_BAD_LINE";
    throw error;
  }
  const text = String(index);
  if (text.length >= digits) return text;
  return " ".repeat(digits - text.length) + text;
}
