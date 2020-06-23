import './stylesheets/style.styl'
import {RangeSlider} from './ts/main'



let newSlider = new RangeSlider('.rangeSlider1', {
  textField : ['.text-field', '.text-field2'],
  range     : false,
  value     : [-22, 33],
  minValue  : -100
})


newSlider.dataset({
  value     : [-23, 42],
  range     : true,
  step      : 0.2,
  maxValue  : 100
})


