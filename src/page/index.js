import '../jquery-wrapper';

// slider 1
const slider = $('.rangeSlider');
slider.rangeSlider({
  sliderValues: [-22, 43],
  minValue: -100,
  textField: ['.text-field', '.text-field2'],
  step: 10,

  points: 21,

  sliderType: 'progress',
  isLabel: true,
  isScale: true,
  // isInvert: true,
});

// slider 2
const slider2 = $('.rangeSlider2');
slider2
  .rangeSlider({
    // isRange: false,
  })
  .rangeSlider('config', {
    sliderValues: [-22, 33],
    textField: ['.text-field3', '.text-field4'],

    // isRange: true,
    isVertical: true,
    isScale: true,
    isLabel: true,
  });

//  tuning rangeSlider

const form = document.querySelector('.tuning');
const btn = form.querySelector('input[type="button"]');

// functions
function convertStringsInValue(data) {
  const newObj = {};
  data.forEach((item) => {
    const { value, name } = item;
    const isString = Number.isNaN(Number(value));

    if (!isString) newObj[item.name] = Number(value);
    else if (value === 'true') newObj[name] = true;
    else if (value === 'false') newObj[name] = false;
    else newObj[name] = value;
  });
  return newObj;
}

function handleButtonClick() {
  const data = $(form).serializeArray();
  const options = convertStringsInValue(data);
  options.sliderValues = [options.sliderValues, options.sliderValues2];
  delete options.sliderValues2;

  slider.rangeSlider('config', options);
}

// event
btn.addEventListener('click', handleButtonClick.bind(form));
