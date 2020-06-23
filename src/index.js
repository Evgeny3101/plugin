import './stylesheets/style.styl'
import {RangeSlider} from './ts/main'



let newSlider = new RangeSlider('.rangeSlider1', {
  textField : ['.text-field', '.text-field2'],
  range     : true,
  value     : [-22, 33],
  minValue  : -100
})


let newSlider2 = new RangeSlider('.rangeSlider2', {
  textField : ['.text-field3', '.text-field4'],
  value     : [-53, 82],
  step      : 0.2,
  maxValue  : 100,
  minValue  : -100,
  range     : true,
  vertical  : true,
})
