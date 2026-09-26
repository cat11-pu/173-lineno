// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let digits = spec.digits || 2;
  parts.log.textContent = "行数 " + (spec.lines || []).length + "，位宽 " + digits + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { digits: digits }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.numbered.forEach(function (line, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = line === "" ? "空行" : line;
      row.appendChild(mark);
      const over = document.createElement("span");
      over.className = "chip" + (view.overflow.indexOf(spot) !== -1 ? " bad" : "");
      over.textContent = view.overflow.indexOf(spot) !== -1 ? "行号超出位宽" : "行号正常";
      row.appendChild(over);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "带号后最长 " + view.longest + " 个字符，超出位宽 " + view.overflow_count + " 行";
    parts.log.textContent = "位宽 " + digits;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "加行号";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "位宽加一";
  moreButton.addEventListener("click", function () {
    digits = digits + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "位宽减一";
  lessButton.addEventListener("click", function () {
    digits = Math.max(1, digits - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "行号位宽";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(digits);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) { digits = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看超出位宽几行";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { digits: digits }));
    parts.out.textContent = "超出位宽 " + view.overflow_count + " 行，共 " + view.count + " 行";
  });
  parts.controls.appendChild(readButton);

  draw();
}
