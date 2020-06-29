import './stylesheets/style.styl'
import {RangeSlider} from './ts/main'



let newSlider = new RangeSlider('.rangeSlider1', {
  textField : ['.text-field', '.text-field2'],
  range     : false,
  value     : [-22, 43],
  minValue  : -100,
})


let newSlider2 = new RangeSlider('.rangeSlider2', {
  textField : ['.text-field3', '.text-field4'],
  value     : [-53.2, 82.6],
  step      : 0.2,
  maxValue  : 100,
  minValue  : -100,
  range     : true,
  vertical  : true,
  label     : true,

  scale         : true,
  points        : 25,
  numberForEach : 8,
  longForEach   : 2,
})

newSlider.dataset({
  scale         : true,
  points        : 19,
  numberForEach : 9,
  longForEach   : 3,
})