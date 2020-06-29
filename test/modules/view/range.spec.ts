import {RangeSlider} from '../../../src/ts/main';

setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')

let slider = new RangeSlider('.js-plugin', {
  value     : [20,50],
  label     : true,
  range     : true,
  vertical  : false,
  textField : ['.text-field', '.text-field2']
})


describe('Range testing.', () => {

  beforeEach(() => {
    // setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
    // slider.dataset({
    //   label     : true,
    //   range     : true,
    // })
  })


  it('Method setClassPositon. Must be a valid class (CSS).', () => {
    slider.dataset({
      vertical : false
    })
    slider.dataset({
      vertical : true
    })
    expect(slider.view.range.DOM).toHaveClass('js-range-slider__vertical')
    expect(slider.view.range.DOM).not.toHaveClass('js-range-slider__horizontal')

    slider.dataset({
      vertical : false
    })
    expect(slider.view.range.DOM).toHaveClass('js-range-slider__horizontal')
    expect(slider.view.range.DOM).not.toHaveClass('js-range-slider__vertical')

  });









})