import {RangeSlider} from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')

let newSlider = new RangeSlider('.js-plugin', {})
let model = newSlider.model


beforeEach(() => {
  model.dataset({
    value : 10,
    range : false,
    minValue : -100,
    maxValue : 200,
    textField : ['.text-field', '.text-field2']
  })
})


describe('Model testing', () => {
  it('положить  15, в массив чисел value при range = false', () => {
    model.dataset({
      value : 15,
      range : false
    })

    expect(model.value).toBeDefined()
    expect(model.value).toEqual([15])

    model.dataset({
      value : [15]
    })
    expect(model.value).toEqual([15])
  })

  it('положить [20, 15], в массив чисел value при range = true, min в [0] max в [1]', () => {
    model.dataset({
      value : [20, 15],
      range : true
    })
    expect(model.value).toBeDefined()
    expect(model.value).toEqual([15, 20])
  })

  it('положить значения min max', () => {
    model.dataset({
      minValue      : 10,
      maxValue      : 90,
    })
    expect(model.minValue).toBeDefined()
    expect(model.maxValue).toBeDefined()
    expect(model.minValue).toEqual(10)
    expect(model.maxValue).toEqual(90)
  })

  it('положить ".text-field" в textField', () => {
    model.dataset({
      textField : ['.text-field']
    })
    expect(model.textField).toEqual(['.text-field']);
  });


  // it('преобразовать координаты в число и положить в value', () => {
  //   newSlider.model.dataset({
  //     value     : [22, 55],
  //     range     : true,
  //     textField : ['.text-field', '.text-field2'],
  //   })

  //   newSlider.model.convertCoords({
  //     coord   : 20,
  //     step    : 1,
  //     id      : 0
  //   })
  // });



  it('проверка метода checkLimit', () => {
    model.dataset({
      minValue : 0,
      maxValue : 100,
      step     : 1,
      value    : [50]
    })

    expect(model.checkLimit([-25, 150])).toEqual([0, 100])
    model.dataset({
      minValue : -100,
    })
    expect(model.checkLimit([-999])).toEqual([-100])
    expect(model.checkLimit([999])).toEqual([100])
  })

  it('выставление на ближайший step, метод putInStep', () => {
    model.value = [-20.12, 80.54]
    expect(model.putInStep(model.value, model.step)).toEqual([-20, 81])
  })


  it('выставление значений value по лимитам и шагу', () => {
    model.dataset({
      minValue : 0,
      maxValue : 100,
      range    : true
    })
    model.setNewValues([1929, -22.231])
    expect(model.value).toEqual([0, 100])

    model.dataset({
      minValue : -50,
      range    : true
    })
    model.setNewValues([1929, -72.231])
    expect(model.value).toEqual([-50, 100])
  })
})




