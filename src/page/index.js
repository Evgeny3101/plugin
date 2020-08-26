import '../jquery-wrapper';

// slider 1
const slider = $('.rangeSlider');
slider.rangeSlider({
  sliderValues: [-22, 43],
  minValue: -100,
  textField: ['.text-field', '.text-field2'],
  step: 10,

  points: 21,

  isRange: true,
  isLabel: true,
  isScale: true,
  // isInvert: true,
});

// slider 2
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

//  tuning rangeSlider
const form = document.querySelector('.tuning');
const btn = form.querySelector('input[type="button"]');

// function
function convertStringsInValue(data) {
  const result = {};
  data.forEach((item) => {
    const itemIsBoolean = Number.isNaN(Number(item.value));

    if (itemIsBoolean) {
      if (item.value === 'true') result[item.name] = true;
      else result[item.name] = false;
    } else result[item.name] = Number(item.value);
  });

  result.sliderValues = [result.sliderValues, result.sliderValues2];
  delete result.sliderValues2;
  return result;
}

function handleButtonClick() {
  const data = $(form).serializeArray();
  const options = convertStringsInValue(data);
  slider.rangeSlider('config', options);
}

// event
btn.addEventListener('click', handleButtonClick.bind(form));
