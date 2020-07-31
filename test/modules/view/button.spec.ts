import '../../../src/ts/main';
import RangeSlider from '../../../src/ts/modules/RangeSlider';
import View from '../../../src/ts/modules/view';
import Config from '../../../src/ts/modules/interface/config';

let slider: RangeSlider;
let config: Config;
let view: View;
let mainDOM: Element;
let elem: HTMLElement;

jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

describe('Button testing. The "move" method.', () => {
  beforeEach(() => {
    loadFixtures('fixt.html');
    loadStyleFixtures('fixt.css');
    mainDOM = document.querySelector('.js-plugin');

    config = $.fn.rangeSlider.defaults;
    config.textField = ['.text-field', '.text-field2'];

    slider = new RangeSlider(mainDOM, config);
    view = slider.view;
    elem = view.button[0].DOM;

    const mousedown = new MouseEvent('mousedown');
    elem.dispatchEvent(mousedown);
  });

  it('The "mousemove" event. Event call.', () => {
    const spyEvent = spyOnEvent(document, 'mousemove');

    const event = new MouseEvent('mousemove');
    document.dispatchEvent(event);

    expect('mousemove').toHaveBeenTriggeredOn(document);
    expect(spyEvent).toHaveBeenTriggered();
  });

  it('Calculation from the left side, if isInvert == false.', () => {
    config.vertical = false;
    config.invert = false;
    view.init(config);
    expect(view.button[0].pos.offset).toBe('left');
  });

  it('Calculation from the right side, if isInvert == true.', () => {
    config.vertical = false;
    config.invert = true;
    view.init(config);
    expect(view.button[0].pos.offset).toBe('right');
  });

  it('The "mousemove" event. Checking limits.', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 10000,
      clientY: 10000,
    });
    document.dispatchEvent(event);

    const event2 = new MouseEvent('mousemove', {
      clientX: -10000,
      clientY: -10000,
    });
    document.dispatchEvent(event2);
  });

  it('The "mouseup" event. Event call.', () => {
    const spyEvent = spyOnEvent(document, 'mouseup');

    const event = new MouseEvent('mouseup');
    document.dispatchEvent(event);

    expect('mouseup').toHaveBeenTriggeredOn(document);
    expect(spyEvent).toHaveBeenTriggered();
    expect(document.onmouseup).toBe(null);
    expect(document.onmousemove).toBe(null);
  });
});
