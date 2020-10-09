import '../jquery-wrapper';

// set the slider settings according to the specified options
function setOptionsTuning(tuningDOM, sliderConfig) {
  const defaultConfig = $.fn.rangeSlider.defaults;
  const names = Object.keys(defaultConfig);
  const config = $.extend({}, defaultConfig, sliderConfig);

  names.forEach((name) => {
    const inputs = tuningDOM.querySelectorAll(`input[name=${name}]`);
    inputs.forEach((input) => {
      const elem = input;

      if (elem.type === 'number') {
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
  const inputsText = tuningDOM.querySelectorAll('input[type="number"]');

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

  value1slider: -22,
  value2slider: 43,

  minValue: -100,
  step: 10,

  isLabel: true,
  isLabelOnClick: true,

  isScale: true,
  points: 21,
};

// slider 2
sliderArr[1] = $('.rangeSlider2');
sliderConfigArr[1] = {
  textField: ['.text-field3', '.text-field4'],
  sliderValues: [-22.3, 33.2],

  isRange: true,
  isScale: true,
  isLabel: true,
  isInvert: true,
};

// slider 3
sliderArr[2] = $('.rangeSlider3');
sliderConfigArr[2] = {
  textField: ['.text-field5', '.text-field6'],
  sliderType: 'range',
  isVertical: true,

  step: 0.001,

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
  textField: ['.text-field7', '.text-field8'],
  type: 'range',
  isScale: true,
  isLabel: true,
};

sliders4Config[1] = {
  textField: ['.text-field9', '.text-field10'],
  type: 'range',
  isScale: true,
  isLabel: true,
};

// init sliders with id '4'
$.each($sliders4, (i, elem) => {
  $(elem).rangeSlider(sliders4Config[i]);
  setListeners(tuningId4Arr[i], elem);
  setOptionsTuning(elem, sliders4Config[i]);
});
