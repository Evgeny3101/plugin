// округляет по числу и убирает лишние знаки
function roundToMultiple(num: number, multiple: number) {
  // округление
  let result: number = Math.round(num / multiple) * multiple;
  // расчет знаков после запятой
  const decimalPlaces = multiple.toString().includes('.')
    ? multiple.toString().split('.').pop().length
    : 0;
  // обрезает лишние знаки после запятой
  result = Number(result.toFixed(decimalPlaces));
  return result;
}

export default roundToMultiple;
