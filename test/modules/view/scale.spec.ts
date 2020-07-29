import '../../../src/ts/main';

jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';
let slider: JQuery<HTMLElement>;

describe('Scale testing.', () => {
  beforeEach(() => {
    loadFixtures('fixt.html');
    loadStyleFixtures('fixt.css');

    slider = $('.js-plugin');
    slider.rangeSlider({
      textField: ['.text-field', '.text-field2'],
      value: [22, 44],
      range: true,
      scale: true,
      points: 11,
      numberForEach: 4,
      longForEach: 2,
    });
  });

  it('The "pressScaleBar" method. Sets the nearest button to the scale position, if range = true.', () => {
    const lines = slider.find('.js-scale-line');

    const textField = $('.text-field');
    $(lines[0]).trigger('click');
    expect(textField.val()).toBe('-100');

    const textField2 = $('.text-field2');
    $(lines[10]).trigger('click');
    expect(textField2.val()).toBe('100');
  });

  it('The "pressScaleBar" method. Sets the nearest button to the scale position, if range = false.', () => {
    slider.rangeSlider('config', { range: false });

    const lines = slider.find('.js-scale-line');

    const textField = $('.text-field');
    $(lines[1]).trigger('click');
    expect(textField.val()).toBe('-80');
  });
});
