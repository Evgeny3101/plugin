import './stylesheets/style.styl'
import {RangeSlider} from './ts/main'



let newSlider = new RangeSlider('.rangeSlider1', {
  textField : ['.text-field', '.text-field2'],
  range: true,
  value: [22, 33],
  minValue: -100
})


newSlider.dataset({
  value: [-23, 42],
  range: true
})


newSlider.model.convertCoords({
  coord   : 20,
  stepSize: 1,
  id      : 0,
})


newSlider.view.updateCoords({
  value     : [47],
  range     : false,
  minValue  : 0
})
