// rounds by number and removes unnecessary signs
function roundToMultiple(num: number, multiple: number) {
  // rounding
  let result: number = Math.round(num / multiple) * multiple;
  // decimal places calculation
  const decimalPlaces = multiple.toString().includes('.')
    ? multiple.toString().split('.').pop().length
    : 0;
  // trims extra decimal places
  result = Number(result.toFixed(decimalPlaces));
  return result;
}

// creates html from string.
// if parent is specified inserts into it
function createHTML(html: string, parent?: Element): any {
  // данный способ позволит редактировать элемент до вставки в документ
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  const content = wrapper.firstElementChild!;
  if (parent) parent.append(content);

  return content;
}

export { roundToMultiple, createHTML };
