import RangeSlider from '../src/ts/main';

describe('Подключение данных', () => {

//   beforeEach( () => {
//     newSlider.value = 2
//     newSlider.size = 1000
//   })

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




//   it('иметь value 2 и size 100', () => {
//     expect(newSlider.value).toEqual(2)
//     expect(newSlider.size).toEqual(1000)
//   })

//   it('иметь метод addValue', () => {
//     expect(newSlider.addValue).toBeDefined()
//   })

//   it('добавить к value +1 и size +500', () => {
//     newSlider.addValue(500)
//     expect(newSlider.value).toEqual(3)
//     expect(newSlider.size).toEqual(1500)
//   })

//   it('спросить true', () => {
//     expect(newSlider.askTrue()).toBe(true)
//   })


})