// rounds by number and removes unnecessary signs
function roundToMultiple(num: number, multiple: number) {
  // rounding
  let result: number = Math.round(num / multiple) * multiple;
  // decimal places calculation
  const decimalPlaces = multiple.toString().includes('.')
    ? multiple.toString().split('.').pop()!.length
    : 0;
  // trims extra decimal places
  result = Number(result.toFixed(decimalPlaces));
  return result;
}

// creates html from string.
function createHTML(html: string): HTMLElement {
  // данный способ позволит редактировать элемент до вставки в документ
  // пробовал заменить на фрагмент и template
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const content = <HTMLElement>wrapper.firstElementChild!;
  return content;
}

export { roundToMultiple, createHTML };
