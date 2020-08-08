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

export default roundToMultiple;
