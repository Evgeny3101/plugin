import './stylesheets/style.styl'
import './ts/main'


let slider1 = $('.rangeSlider1')
slider1.rangeSlider({
    textField : ['.text-field', '.text-field2'],
    range     : true,
    label     : true,
    value     : [-22, 43],
    minValue  : -100,
})



let slider2 = $('.rangeSlider2')
slider2.rangeSlider({
    range     : false,
    value     : 50,

    textField : ['.text-field3', '.text-field4']
  }).rangeSlider('settings', {
    range     : true,
    value     : [20, 60]
  }).rangeSlider('settings', {
    range     : false,
    value     : [20, 60]
  })

