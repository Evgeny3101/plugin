import '../../../src/ts/main';
import RangeSlider from '../../../src/ts/modules/RangeSlider';
import View from '../../../src/ts/modules/view';
import Config from '../../../src/ts/modules/interface/IConfig';

let slider: RangeSlider;
let config: Config;
let view: View;
let mainDOM: Element;

jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

describe('TextField testing.', () => {
  beforeEach(() => {
    loadFixtures('fixt.html');
    loadStyleFixtures('fixt.css');
    mainDOM = document.querySelector('.js-plugin');

    config = $.fn.rangeSlider.defaults;
    config.textField = ['.text-field', '.text-field2'];

    slider = new RangeSlider(mainDOM, config);
    view = slider.view;
  });

  it('The "setTextField" method. Throws error if not found element.', () => {
    expect(view.textField[0].DOM).toBeDefined();
    expect(() => {
      view.textField[0].setTextField('.random');
    }).toThrowError();
  });

  it('The "toInputValues" method. Sets values from text-field.', () => {
    const textField = $('.text-field');

    textField.val(-120);
    view.textField[0].Observable.subscribe(
      (data: { value: number[]; elem: TextField }) => {
        expect(data.value).toEqual([-120]);
      }
    );
    view.textField[0].toInputValues();
  });

  it('The "toInputValues" method. Sets values from text-field, if is not number', () => {
    const textField = $('.text-field');

    textField.val('sd');
    view.textField[0].Observable.subscribe(
      (data: { value: number[]; elem: TextField }) => {
        expect(data.value).toEqual([0]);
      }
    );
    view.textField[0].toInputValues();
  });
});
