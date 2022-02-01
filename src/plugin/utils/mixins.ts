// rounds by number and removes unnecessary signs
function roundToMultiple(num: number, multiple: number, minValue?: number, maxValue?: number) {
  let result: number;
  // rounding
  if(minValue === maxValue) return minValue || 0;

  if(minValue) {
    result = (Math.round((num - minValue)/ multiple) * multiple) + minValue;
  } else result = Math.round(num/ multiple) * multiple;

  if(maxValue) result = result > maxValue ? maxValue : result;  

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
