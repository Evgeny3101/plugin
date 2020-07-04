import  '../src/ts/main';

let elem
beforeEach(() => {
  setFixtures('<div class="js-plugin"></div><input class="text-field"></input>input class="text-field2"></input>')
  elem = $('.js-plugin')
});


describe('jquery.rangeSlider.', () => {
  it('Must be available in jquery object', () => {
    expect($.fn.rangeSlider).toBeDefined()
  });

  it('Must have a chain method of calling', () => {
    expect(elem.rangeSlider()).toBe(elem);
  });

});



