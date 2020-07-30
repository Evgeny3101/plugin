import '../../../src/ts/main';
import View from '../../../src/ts/modules/view';
import Config from '../../../src/ts/modules/interface/config';

let config: Config;
let view: View;
let mainDOM: Element;

jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

describe('Button testing.', () => {
  beforeEach(() => {
    loadFixtures('fixt.html');
    loadStyleFixtures('fixt.css');
    mainDOM = document.querySelector('.js-plugin');

    config = $.fn.rangeSlider.defaults;
    config.textField = ['.text-field', '.text-field2'];

    view = new View(mainDOM, config);
  });

  it('The "move" event. Receives the coordinates of a button and sends a notification to subscribers.', () => {
    view.button[0].Observable.subscribe((data: { value: number[]; elem: TextField }) => {
      console.log('event');
      expect(data.elem).toBeDefined();
    });
    console.log(view.button[0].DOM);
    $(view.button[0].DOM).trigger('click');
  });

  // it('The "toInputValues" method. Sets values from text-field.', () => {
  //   const textField = $('.text-field');

  //   textField.val(-120);
  //   view.textField[0].Observable.subscribe(
  //     (data: { value: number[]; elem: TextField }) => {
  //       expect(data.value).toEqual([-120]);
  //     }
  //   );
  //   view.textField[0].toInputValues();
  // });
});
