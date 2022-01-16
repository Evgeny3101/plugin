// set the slider settings according to the specified options
function setOptionsTuning(tuningDOM, sliderConfig) {
  const { defaultConfig } = $.fn.rangeSlider;
  const names = Object.keys(defaultConfig);
  const config = { ...defaultConfig, ...sliderConfig };

  names.forEach((name) => {
    if (name === 'sliderValues') {
      const value1 = tuningDOM.querySelector(`input[name=${'value1Slider'}]`);
      const value2 = tuningDOM.querySelector(`input[name=${'value2Slider'}]`);
      if (value1) value1.value = config.sliderValues[0] || 0;
      if (value2) value2.value = config.sliderValues[1] || 0;
    }

    const inputs = tuningDOM.querySelectorAll(`input[name=${name}]`);
    inputs.forEach((input) => {
      const elem = input;

      if (elem.type === 'text') {
        elem.value = config[name];
        return;
      }

      if (elem.value === String(config[name])) {
        elem.checked = true;
      }
    });
  });
}

// event handling
function convertStringsInValue(string) {
  let value = string;
  const isString = Number.isNaN(Number(value));

  if (!isString) value = Number(value);
  if (value === 'true') value = true;
  if (value === 'false') value = false;

  return value;
}

function handleButtonClick(slider, event) {
  const { value, name } = event.target;
  const newOption = {};
  newOption[name] = convertStringsInValue(value);

  slider.rangeSlider('config', newOption);
}

function handleButtonBlur(slider, inputsText) {
  const newConfig = {};
  inputsText.forEach(input => {
    newConfig[input.name] = convertStringsInValue(input.value); 
  });

  slider.rangeSlider('config', newConfig);
}

function setListeners(tuningDOM, slider) {
  const inputsRadio = tuningDOM.querySelectorAll('input[type="radio"]');
  const inputsText = tuningDOM.querySelectorAll('input[type="text"]');

  inputsRadio.forEach((elem) =>
    elem.addEventListener('click', handleButtonClick.bind(tuningDOM, slider))
  );
  inputsText.forEach((elem) =>
    elem.addEventListener('blur', handleButtonBlur.bind(tuningDOM, slider, inputsText))
  );
}

// ==========================
// config
const sliderConfigArr = [];

// slider 1
const resultValueDOM = document.querySelectorAll('.js-result-value')[0];
sliderConfigArr[0] = {
  textField: ['.js-text-field1', '.js-text-field2'],
  sliderType: 'range',
  value1Slider: 50,
  value2Slider: 1000,
  maxValue: 0,
  minValue: 150,
  step: 25,
  isLabel: false,
  isScale: true,
  points: 5,
  numberForEach: 1,
  longForEach: 1,

  updateValues(values) {
    const formalizedValuesArr = values.map((name) => {
      return `${name.toLocaleString()} ₽`;
    });

    resultValueDOM.innerText = formalizedValuesArr.join(' – ');
  },
};

// slider 2
sliderConfigArr[1] = {
  textField: ['.js-text-field3', '.js-text-field4'],
  sliderValues: [-22.3, 33.2],
  step: 0.1,
  isRange: true,
  isScale: true,
  isLabel: true,
  isLabelOnClick: true,
  isInvert: true,
};

// slider 3
sliderConfigArr[2] = {
  value1Slider: 22,
  textField: ['.js-text-field5', '.js-text-field6'],
  sliderType: 'progress',
  step: 0.001,
  isVertical: true,
  isScale: true,
  points: 10,
  numberForEach: 3,
  longForEach: 3,
};

// ==========================
// init sliders with id '1-3'
const $slidersArr = [];
const tuningArr = document.querySelectorAll('.tuning');

$slidersArr[0] = $('.js-range-slider1');
$slidersArr[1] = $('.js-range-slider2');
$slidersArr[2] = $('.js-range-slider3');

$slidersArr.forEach((slider, i) => {
  slider.rangeSlider(sliderConfigArr[i]);
  setListeners(tuningArr[i], $slidersArr[i]);
  setOptionsTuning(tuningArr[i], sliderConfigArr[i]);
});

// ==========================
// two sliders with id '4'
const $sliders4 = $('.js-range-slider4');
const tuningId4Arr = [tuningArr[3], tuningArr[4]];
const sliders4Config = [];
sliders4Config[0] = {
  sliderValues: [5, 25],
  textField: ['.js-text-field7', '.js-text-field8'],
  sliderType: 'range',
  isScale: true,
  isLabel: true,
  isLabelOnClick: true,
};

sliders4Config[1] = {
  value1Slider: 25,
  value2Slider: 65,
  textField: ['.js-text-field9', '.js-text-field10'],
  sliderType: 'range',
  isScale: true,
  isLabel: true,
};

$.each($sliders4, (i, elem) => {
  $(elem).rangeSlider(sliders4Config[i]);
  setListeners(tuningId4Arr[i], elem);
  setOptionsTuning(tuningId4Arr[i], sliders4Config[i]);
});
