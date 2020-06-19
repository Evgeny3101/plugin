import './stylesheets/style.styl'


import {RangeSlider} from './ts/main'

let newSlider = new RangeSlider('.rangeSlider1', {
  textField : ['.text-field', '.text-field2']
})



newSlider.dataset({
  value: 22
})

newSlider.view.updateTextField([33,22])



console.log(newSlider)