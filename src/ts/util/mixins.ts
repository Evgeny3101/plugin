  function roundToMultiple(num: number, multiple: number) {
    // округляет по числу
    let result: number = Math.round(num/multiple) * multiple;
    return result
  }

  function countsDecimalPlaces(num: number) {
    // считает знаки после запятой
    let result: number = (num.toString().includes('.')) ? (num.toString().split('.').pop().length) : (0);
    return  result
  }