import {RangeSlider} from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let newSlider = new RangeSlider('.js-plugin', {})
let model = newSlider.model



beforeEach(() => {
  model.dataset({
    value : 10,
    range : false,
    minValue : -100,
    maxValue : 200
  })
})


describe('testing Model', () => {
  it('minValue set', () => {
    expect(model).toBeDefined();
    model.dataset({
      minValue : -200,
    })
  });
});


describe('testing Model', () => {
  it('fixtures', () => {
    expect(model).toBeDefined();
  });

  it('положить  15, в массив чисел sliderValue при range = false', () => {
    model.dataset({
      value : 15
    })

    expect(model.value).toBeDefined()
    expect(model.value).toEqual([15])
  })

  it('положить [15], в массив чисел value при range = false', () => {
    model.dataset({
      value : [15]
    })
    expect(model.value).toBeDefined()
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
    expect(model.putInStep(model.value, model.step)).toEqual([10])

    model.value = [-20.12, 80.54]
    expect(model.putInStep(model.value, model.step)).toEqual([-20, 81])
  })


  it('выставление значений value по лимитам и шагу', () => {
    model.dataset({
      minValue : 0,
      maxValue : 100,
      range    : true
    })
    model.setSliderValue([1929, -22.231])
    expect(model.value).toEqual([0, 100])

    model.dataset({
      minValue : -50,
      range    : true
    })
    model.setSliderValue([1929, -72.231])
    expect(model.value).toEqual([-50, 100])

  })
})




