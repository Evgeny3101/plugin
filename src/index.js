import './stylesheets/style.styl'

import {RangeSlider} from './ts/main'


let rangeSlider = new RangeSlider('.rangeSlider1', {})

rangeSlider.model.dataset({
  value: [20, 22],
  range: true,
  minValue: 10
})

rangeSlider.model.dataset({
  value: 22,
  range: false,
  minValue: 30
})