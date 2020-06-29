import {RangeSlider} from '../../../src/ts/main';

setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')

let slider = new RangeSlider('.js-plugin', {
  value     : [20,50],
  scale     : true,
  vertical  : false,
  textField : ['.text-field', '.text-field2']
})


describe('Scale testing.', () => {
  beforeEach(() => {
    setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
    slider.dataset({
      scale         : true,
      points        : 11,
      numberForEach : 4,
      longForEach   : 2,
    })
  })


  it('Method setScale. Creating DOM elements with required classes(CSS).', () => {
    expect(slider.view.scale).toBeDefined();

    let scale = slider.view.scale
    expect(scale.DOM).toEqual('div.js-scale-range')
    expect(scale.points[0].DOM.querySelector('.js-scale-line__number')).toEqual('div.js-scale-line__number')
    expect(scale.points[0].DOM.querySelector('.js-scale-line__long')).toEqual('div.js-scale-line__long')
    expect(scale.points[1].DOM.querySelector('.js-scale-line__short')).toEqual('div.js-scale-line__short')
  });

  it('Method setScale. Checking position elements in DOM. points 9, num 4, long 2', () => {
    setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
    slider.dataset({
      scale         : true,
      points        : 9,
      numberForEach : 4,
      longForEach   : 2,
    })

    let scale = slider.view.scale
    expect(scale.points[8].DOM.querySelector('.js-scale-line__number')).toEqual('div.js-scale-line__number')
    expect(scale.points[8].DOM.querySelector('.js-scale-line__long')).toEqual('div.js-scale-line__long')
    expect(scale.points[7].DOM.querySelector('.js-scale-line__short')).toEqual('div.js-scale-line__short')
  });

  it('Method setScale. Checking position elements in DOM. points 19, num 9, long 3', () => {
    setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
    slider.dataset({
      scale         : true,
      points        : 19,
      numberForEach : 9,
      longForEach   : 3,
    })

    let scale = slider.view.scale
    expect(scale.points[9].DOM.querySelector('.js-scale-line__number')).toEqual('div.js-scale-line__number')
    expect(scale.points[9].DOM.querySelector('.js-scale-line__long')).toEqual('div.js-scale-line__long')
    expect(scale.points[8].DOM.querySelector('.js-scale-line__short')).toEqual('div.js-scale-line__short')
    expect(scale.points[10].DOM.querySelector('.js-scale-line__short')).toEqual('div.js-scale-line__short')

    expect(scale.points[18].DOM.querySelector('.js-scale-line__number')).toEqual('div.js-scale-line__number')
    expect(scale.points[18].DOM.querySelector('.js-scale-line__long')).toEqual('div.js-scale-line__long')
    expect(scale.points[17].DOM.querySelector('.js-scale-line__short')).toEqual('div.js-scale-line__short')
    expect(scale.points[19]).not.toBeDefined()
  });

  it('Method pressScaleBar. Setting the nearest button to the scale position, if range = true', () => {
    setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
    slider.dataset({
      value    : [22, 44],
      minValue : -40,
      maxValue : 60,
      range    : true,
      points   : 11,
    })

    slider.view.scale.pressScaleBar(slider.view.button, slider.model.range, 0)
    expect(slider.model.value[0]).toEqual(-40)

    // slider.view.scale.pressScaleBar(slider.view.button, slider.model.range, 10)
    // expect(slider.model.value[1]).toEqual(60)
  });
})

it('Method pressScaleBar. Setting the nearest button to the scale position, if range = false', () => {
  setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
  slider.dataset({
    value    : [22, 44],
    minValue : -40,
    maxValue : 55,
    range    : false,
    scale    : true,
    points   : 11,
  })

  slider.view.scale.pressScaleBar(slider.view.button, slider.model.range, 0)
  expect(slider.model.value[0]).toEqual(-40)

  slider.view.scale.pressScaleBar(slider.view.button, slider.model.range, 10)
  expect(slider.model.value[0]).toEqual(55)
})