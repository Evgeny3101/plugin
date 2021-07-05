import '../../src/jquery-wrapper';
import Button from '../../src/components/view/button/button';

const $: any = jQuery;
let button: Button;

setFixtures('<div class="js-plugin"></div>');
const $elem = $('.js-plugin').rangeSlider();

const tests = () => {
  beforeEach(() => {
    [button] = $elem.rangeSlider.sliders[0].view.button;

    const mousedown = new MouseEvent('mousedown');
    button.DOM.dispatchEvent(mousedown);
  });

  it('Событие "mousemove".', () => {
    const spyEvent = spyOnEvent(<any>document, 'mousemove');

    const event = new MouseEvent('mousemove');
    document.dispatchEvent(event);

    expect(spyEvent).toHaveBeenTriggered();
  });

  it('Событие "mouseup". Вызвано. Проверка уведомления.', () => {
    const spyEvent = spyOnEvent(<any>document, 'mouseup');
    const spyObservable = spyOn(button.Observable, 'notify');

    const event = new MouseEvent('mouseup');
    document.dispatchEvent(event);

    expect(spyEvent).toHaveBeenTriggered();
    expect(document.onmouseup).toBe(null);
    expect(document.onmousemove).toBe(null);
    expect(spyObservable).toHaveBeenCalledWith({
      isMouseDown: false,
    });
  });
};

const touchTests = () => {
  beforeEach(() => {
    [button] = $elem.rangeSlider.sliders[0].view.button;
  });

  it('Событие "touchmove".', () => {
    spyOn(<any>button, 'handleButtonTouchmove');
    const touchmove = new TouchEvent('touchmove');
    button.handleButtonTouchmove(touchmove);

    expect(button.handleButtonTouchmove).toHaveBeenCalled()
  });

  it('Событие "touchend".', () => {
    spyOn(<any>button, 'handleButtonTouchend');
    const touchend = new TouchEvent('touchend');
    button.handleButtonTouchend(touchend);

    expect(button.handleButtonTouchend).toHaveBeenCalled()
  });

  it('Сообщение о "isMouseDown: false".', () => {
    const spyObservable = spyOn(button.Observable, 'notify');
    const touchend = new TouchEvent('touchend');

    button.handleButtonTouchend(touchend);

    expect(spyObservable).toHaveBeenCalledWith({
      isMouseDown: false,
    });
  });
};

describe('Класс Button.', () => {
  describe('isInvert === true.', () => {
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
    touchTests();
  });

  describe('isInvert === false.', () => {
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
    touchTests();
  });
});
