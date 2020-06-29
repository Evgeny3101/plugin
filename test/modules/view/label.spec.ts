import {RangeSlider} from '../../../src/ts/main';

setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')

let slider = new RangeSlider('.js-plugin', {
  value     : [20,50],
  label     : true,
  range     : true,
  textField : ['.text-field', '.text-field2']
})


describe('Label testing.', () => {

  beforeEach(() => {
    setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
    slider.dataset({
      label     : true,
      range     : true,
    })
  })


  it('Check elements by class and tag', () => {
    expect(slider.view.label[0].DOM).toEqual('div.js-label-wrapper')
    expect(slider.view.label[1].DOM).toEqual('div.js-label-wrapper')

    expect(slider.view.label[0].input).toEqual('input.js-label-input')
    expect(slider.view.label[1].input).toEqual('input.js-label-input')
  })

  it('Check methods show/hide elements', () => {
    slider.view.label[0].show()
    expect(slider.view.label[0].DOM).toHaveCss({'display': 'block'});

    slider.view.label[0].hide()
    expect(slider.view.label[0].DOM).toHaveCss({"display": "none"});
  });


})

