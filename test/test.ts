import RangeSlider from '../src/ts/main';

describe('Подключение данных', () => {

  it('положить  15, в массив чисел sliderValue при range = false', () => {
    let newSlider = new RangeSlider('id-test', {
      value         : 15
    })
    expect(newSlider.model.sliderValue).toBeDefined()
    expect(newSlider.model.sliderValue).toEqual([15])
  })

  it('положить [15], в массив чисел sliderValue при range = false', () => {
    let newSlider = new RangeSlider('id-test', {
      value         : [15]
    })
    expect(newSlider.model.sliderValue).toBeDefined()
    expect(newSlider.model.sliderValue).toEqual([15])
  })

  it('положить [20, 15], в массив чисел sliderValue при range = true, min в [0] max в [1]', () => {
    let newSlider = new RangeSlider('id-test', {
      value         : [20, 15],
      range         : true
    })
    expect(newSlider.model.sliderValue).toBeDefined()
    expect(newSlider.model.sliderValue).toEqual([15, 20])
  })


  it('положить значения min max', () => {
    let newSlider = new RangeSlider('id-test', {
      minValue      : 10,
      maxValue      : 90,
    })
    expect(newSlider.model.minValue).toBeDefined()
    expect(newSlider.model.maxValue).toBeDefined()
    expect(newSlider.model.minValue).toEqual(10)
    expect(newSlider.model.maxValue).toEqual(90)
  })

  it('положить значение verticalPos', () => {
    let newSlider = new RangeSlider('id-test', {
      verticalPos   : true,
    })
    expect(newSlider.model.verticalPos).toBeDefined()
    expect(newSlider.model.verticalPos).toBe(true)
  })

  it('положить значение lable', () => {
    let newSlider = new RangeSlider('id-test', {
      lable         : true,
    })
    expect(newSlider.model.lable).toBeDefined()
    expect(newSlider.model.lable).toBe(true)
  })

  it('установка step и decimalPlaces', () => {
    let newSlider = new RangeSlider('id-test', {
      step          : -10
    })
    expect(newSlider.model.step).toEqual(-10)
    expect(newSlider.model.decimalPlaces).toEqual(0)

    newSlider.model.setStep(2.23)
    expect(newSlider.model.step).toEqual(2.23)
    expect(newSlider.model.decimalPlaces).toEqual(2)

    newSlider.model.setStep(-0.1223)
    expect(newSlider.model.step).toEqual(-0.1223)
    expect(newSlider.model.decimalPlaces).toEqual(4)
  })
})


describe('class model', () => {

  let newSlider = new RangeSlider('id-test', {})
  let slider =  newSlider.model
  beforeEach( () => {
    slider.minValue    = 0
    slider.maxValue    = 100
    slider.step        = 1

    slider.sliderValue = [50]
  })


  it('проверка метода checkLimit', () => {
    expect(slider.checkLimit([-25, 150])).toEqual([0, 100])
    slider.minValue = -100
    expect(slider.checkLimit([-999])).toEqual([-100])
    expect(slider.checkLimit([999])).toEqual([100])
  })


  it('выставление на ближайший step, метод putInStep', () => {
    expect(slider.putInStep(slider.sliderValue, slider.step)).toEqual([50])

    slider.sliderValue = [-20.12, 80.54]
    expect(slider.putInStep(slider.sliderValue, slider.step)).toEqual([-20, 81])
  })


  it('выставление значений sliderValue по лимитам и шагу', () => {
    expect(slider.setSliderValue([1929, -22.231])).toEqual([0, 100])
    slider.minValue = -50
    expect(slider.setSliderValue([1929, -72.231])).toEqual([-50, 100])

  })




})