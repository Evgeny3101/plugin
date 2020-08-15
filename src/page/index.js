import '../jquery-wrapper';

const slider = $('.rangeSlider');
slider.rangeSlider({
  sliderValues: [-22, 43],
  minValue: -100,
  textField: ['.text-field', '.text-field2'],

  isRange: true,
  isLabel: true,
  isScale: true,
  // isInvert: true,
});

const slider2 = $('.rangeSlider2');
slider2
  .rangeSlider({
    isRange: false,
  })
  .rangeSlider('config', {
    sliderValues: [-22, 33],
    textField: ['.text-field3', '.text-field4'],

    isRange: true,
    isVertical: true,
    isScale: true,
    isLabel: true,
  });

const form = document.querySelector('.tuning');
const btn = form.querySelector('input[type="button"]');

function stringInValue(data) {
  const result = {};
  data.forEach((elem) => {
    const itemIsBoolean = Number.isNaN(Number(elem.value));

    if (itemIsBoolean) {
      if (elem.value === 'true') result[elem.name] = true;
      else result[elem.name] = false;
    } else result[elem.name] = Number(elem.value);
  });

  result.sliderValues = [result.sliderValues, result.sliderValues2];
  delete result.sliderValues2;
  return result;
}

function sendOptions() {
  const data = $(form).serializeArray();
  const result = stringInValue(data);
  slider.rangeSlider('config', result);
}

btn.addEventListener('click', sendOptions.bind(form));