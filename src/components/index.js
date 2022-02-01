import Tuning from './modules/tuning/tuning';

// ==========================
// config
const sliderConfigArr = [];

// slider 1
const resultValueDOM = document.querySelectorAll('.js-result-value')[0];
sliderConfigArr[0] = {
  textField: ['.js-text-field1', '.js-text-field2'],
  sliderType: 'range',
  value1Slider: -60,
  value2Slider: 1000,
  maxValue: 100,
  minValue: -100,
  step: 25,
  isLabel: true,
  isScale: true,
  pointsForEach: 2,
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
  pointsForEach: 100,
  isRange: true,
  isScale: false,
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
  pointsForEach: 10000,
  numberForEach: 4,
  longForEach: 2,
};

// ==========================
// init sliders with id '1-3'
const slidersArr = [
  $('.js-range-slider1'), 
  $('.js-range-slider2'),
  $('.js-range-slider3')
];
const tuningArrDOM = document.querySelectorAll('.tuning');

const tuningArr = [];
slidersArr.forEach(($slider, i) => {
  $slider.rangeSlider(sliderConfigArr[i]);
  const slider = $.fn.rangeSlider.sliders[i];
  tuningArr[i] = new Tuning(tuningArrDOM[i], slider);
});


// ==========================
// two sliders with id '4'
const $sliders4 = $('.js-range-slider4');
const tuningArrId4DOM = [tuningArrDOM[3], tuningArrDOM[4]];
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

const tuningId4Arr = [];
$sliders4.each((i, elem) => {
  $(elem).rangeSlider(sliders4Config[i]);
  const slider = $.fn.rangeSlider.sliders[i + 3];
  tuningId4Arr[i] = new Tuning(tuningArrId4DOM[i], slider);
});
