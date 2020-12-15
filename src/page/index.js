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

// event handling //

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
  $(slider).rangeSlider('config', newOption);
}

function setListeners(tuningDOM, slider) {
  const inputsRadio = tuningDOM.querySelectorAll('input[type="radio"]');
  const inputsText = tuningDOM.querySelectorAll('input[type="text"]');

  inputsRadio.forEach((elem) =>
    elem.addEventListener('click', handleButtonClick.bind(tuningDOM, slider))
  );
  inputsText.forEach((elem) =>
    elem.addEventListener('blur', handleButtonClick.bind(tuningDOM, slider))
  );
}

const sliderArr = [];
const sliderConfigArr = [];
const tuningArr = document.querySelectorAll('.tuning');

// slider 1
sliderArr[0] = $('.rangeSlider1');
sliderConfigArr[0] = {
  textField: ['.text-field1', '.text-field2'],
  sliderType: 'range',

  value1Slider: -1000,
  value2Slider: 1000,

  maxValue: 10000,
  minValue: -10000,
  step: 100,

  isLabel: false,

  isScale: true,
  points: 21,

  updateValues(values) {
    const valuesArr = values.map((name) => `${name.toLocaleString()}$`);
    return valuesArr;
  },
};

// slider 2
sliderArr[1] = $('.rangeSlider2');
sliderConfigArr[1] = {
  textField: ['.text-field3', '.text-field4'],
  sliderValues: [-22.3, 33.2],
  step: 0.1,

  isRange: true,
  isScale: true,
  isLabel: true,
  isLabelOnClick: true,
  isInvert: true,
};

// slider 3
sliderArr[2] = $('.rangeSlider3');
sliderConfigArr[2] = {
  value1Slider: 22,
  textField: ['.text-field5', '.text-field6'],
  sliderType: 'progress',
  step: 0.001,

  isVertical: true,
  isScale: true,
  points: 10,
  numberForEach: 3,
  longForEach: 3,
};

// init sliders with id '1-3'
sliderArr.forEach((slider, i) => {
  slider.rangeSlider(sliderConfigArr[i]);
  setListeners(tuningArr[i], sliderArr[i]);
  setOptionsTuning(tuningArr[i], sliderConfigArr[i]);
});

// two sliders with id '4'
const $sliders4 = $('.rangeSlider4');
const tuningId4Arr = [tuningArr[3], tuningArr[4]];
const sliders4Config = [];
sliders4Config[0] = {
  sliderValues: [5, 25],
  textField: ['.text-field7', '.text-field8'],
  sliderType: 'range',
  isScale: true,
  isLabel: true,
  isLabelOnClick: true,
};

sliders4Config[1] = {
  value1Slider: 25,
  value2Slider: 65,
  textField: ['.text-field9', '.text-field10'],
  sliderType: 'range',
  isScale: true,
  isLabel: true,
};

// init sliders with id '4'
$.each($sliders4, (i, elem) => {
  $(elem).rangeSlider(sliders4Config[i]);
  setListeners(tuningId4Arr[i], elem);
  setOptionsTuning(tuningId4Arr[i], sliders4Config[i]);
});
