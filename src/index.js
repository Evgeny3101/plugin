import './stylesheets/style.styl'
import './stylesheets/range_slider.styl'
import './ts/main'


let slider1 = $('.rangeSlider1')
slider1.rangeSlider({
  value     : [-22, 43],
  minValue  : -100,

  textField : ['.text-field', '.text-field2'],

  range     : true,
  label     : true,
  scale     : true,
  invert    : true,
})


let slider2 = $('.rangeSlider2')
slider2.rangeSlider({
    range     : false,
    textField : ['.text-field3', '.text-field4']
  // })
  }).rangeSlider('config', {
    range     : true,
    vertical  : true,
    scale     : true,
    label     : true,
    // value     : [-400, -200],
    // minValue  : -400,
    // maxValue  : -100,
  })


  let form = document.querySelector(".tuning")
  let btn  = form.querySelector('input[type="button"]')

  btn.addEventListener("click", function(event) {
    let data, result = {}
    data = $(".tuning").serializeArray();

    result = stringInValue(data)
    slider1.rangeSlider('config', result)
  })

  function stringInValue (data) {
    let result = {}
    data.forEach(elem => {
      let itemIsBoolean = isNaN(Number(elem.value))

      if( itemIsBoolean ) {
        if( elem.value == 'true' ) result[elem.name] = true
        else result[elem.name] = false
      }
      else result[elem.name] = Number(elem.value)
    })

    result.value = [result.value, result.value2]
    return result
  }