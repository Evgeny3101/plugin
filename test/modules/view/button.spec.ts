import '../../../src/jquery-wrapper';
import Config from '../../../src/components/interface/IConfig';
import Button from '../../../src/components/view/button/button';

setFixtures(
  '<div class="js-plugin"></div>'
);

const $elem = $('.js-plugin').rangeSlider();

let button: Button;
let config: Config;


const tests = () => {
  beforeEach(() => {

    button = $elem.rangeSlider.sliders[0].view.button[0];
    config = $elem.rangeSlider.sliders[0].config;

    const mousedown = new MouseEvent('mousedown');
    button.DOM.dispatchEvent(mousedown);
  });


  it('Событие "mousemove".', () => {
    const spyEvent = spyOnEvent(document, 'mousemove');

    const event = new MouseEvent('mousemove');
    document.dispatchEvent(event);

    expect('mousemove').toHaveBeenTriggeredOn(document);
    expect(spyEvent).toHaveBeenTriggered();
  });

  it('Событие "mouseup". Вызвано. Проверка сообщения.', () => {
    const spyEvent = spyOnEvent(document, 'mouseup');
    const spyObservable = spyOn(button.Observable, 'notify');

    const event = new MouseEvent('mouseup');
    document.dispatchEvent(event);

    expect('mouseup').toHaveBeenTriggeredOn(document);
    expect(spyEvent).toHaveBeenTriggered();
    expect(document.onmouseup).toBe(null);
    expect(document.onmousemove).toBe(null);
    expect(spyObservable).toHaveBeenCalledWith({
      isMouseDown: false,
    });
  });
};

describe('Класс Button.', () => {
  describe('isInvert == true', () => {
    beforeEach(() => {
      setFixtures(
        '<input class="text-field"></input><input class="text-field2"></input>'
      );

      $elem.rangeSlider('config', {
        textField: ['.text-field', '.text-field2'],
        sliderType: 'range',
        isInvert: true,
      });
    });

    tests();
  });


  describe('isInvert == false', () => {
    beforeEach(() => {
      setFixtures(
        '<input class="text-field"></input><input class="text-field2"></input>'
      );

      $elem.rangeSlider('config', {
        textField: ['.text-field', '.text-field2'],
        sliderType: 'range',
        isInvert: false,
      });
    });

    tests();
  });
});