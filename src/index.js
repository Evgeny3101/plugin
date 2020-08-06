import './stylesheets/style.styl';
import './stylesheets/range_slider.styl';
import './ts/main';

const slider = $('.rangeSlider');
slider.rangeSlider({
  value: [-22, 43],
  minValue: -100,

  textField: ['.text-field', '.text-field2'],

  range: true,
  label: true,
  scale: true,
  invert: true,
});

const slider2 = $('.rangeSlider2');
slider2
  .rangeSlider({
    range: false,
  })
  .rangeSlider('config', {
    value: [-22, 33],
    range: true,
    vertical: true,
    scale: true,
    label: true,
    textField: ['.text-field3', '.text-field4'],
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

  result.value = [result.value, result.value2];
  delete result.value2;
  return result;
}

function sendOptions() {
  const data = $(form).serializeArray();
  const result = stringInValue(data);
  slider.rangeSlider('config', result);
}

btn.addEventListener('click', sendOptions.bind(form));
