import '../../src/jquery-wrapper';
import Controller from '../../src/components/controller';
import Model from '../../src/components/model';
import View from '../../src/components/view/view';
import RangeSlider from '../../src/components/range-slider';

const $: any = jQuery;

setFixtures('<div class="js-plugin"></div>');

const { defaultConfig } = $.fn.rangeSlider;
const slider = new RangeSlider('.js-plugin', {}, defaultConfig);
let controller: Controller;
let model: Model;
let view: View;

const tests = () => {
  beforeEach(() => {
    controller = slider.controller;
    model = slider.model;
    view = slider.view;
  });

  it('Метод "subscribeToChangeValue". Подписка на уведомления при изменении значения слайдера. Уведомления методом "Model.updateValue".', () => {
    controller.subscribeToChangeValue();
    const spyMethod1 = spyOn(view, 'setValues');
    const spyMethod2 = spyOn(view, 'convertValues');

    controller.isMouseDown = true;
    model.updateValue(11, 0);
    model.updateValue(44, 1);

    expect(spyMethod1).toHaveBeenCalledWith([11, 44]);

    controller.isMouseDown = false;
    model.updateValue(33, 1);

    expect(spyMethod2).toHaveBeenCalledWith([11, 33]);
  });

  it('Метод "subscribeButtons". Подписка на уведомления от кнопок. Уведомления методом "Button.move" при нажатии на кнопку.', () => {
    controller.subscribeButtons();
    const spyMethod = spyOn(model, 'convertCoords');

    const mousedown = new MouseEvent('mousedown');
    view.button[0].DOM.dispatchEvent(mousedown);

    const event = new MouseEvent('mousemove', {
      clientX: 10000,
      clientY: 10000,
    });
    document.dispatchEvent(event);

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Метод "subscribeButtons". Подписка на уведомления от кнопок. Уведомления методом "Button.move" при отжатии кнопки.', () => {
    controller.subscribeButtons();
    const spyModelMethod = spyOn(model, 'convertCoords');

    const mousedown = new MouseEvent('mousedown');
    view.button[0].DOM.dispatchEvent(mousedown);

    const event = new MouseEvent('mousemove', {
      clientX: 10000,
      clientY: 10000,
    });
    document.dispatchEvent(event);

    const spyViewMethod = spyOn(view, 'setCoords');

    const mouseup = new MouseEvent('mouseup');
    document.dispatchEvent(mouseup);

    expect(spyViewMethod).not.toHaveBeenCalled();
    expect(spyModelMethod).toHaveBeenCalled();
  });

  it('Метод "subscribeTextField". Подписка на уведомления на изменение значения в текстовом поле. Уведомления "TextField.getValue".', () => {
    controller.subscribeTextField();
    const spyMethod = spyOn(model, 'updateValue');

    view.textField[0].getValue();

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Метод "subscribePoint". Подписка на уведомления о клике по шкале. Уведомления методом "Point.clickPoint".', () => {
    controller.subscribePoint();
    const spyMethod = spyOn(model, 'updateValue');

    view.scale?.points[0].clickPoint();
    view.scale?.points[12].clickPoint();

    expect(spyMethod).toHaveBeenCalled();
  });
};

describe('Класс Controller.', () => {
  describe('isInvert == true.', () => {
    beforeEach(() => {
      setFixtures(
        '<input class="text-field"></input><input class="text-field2"></input>'
      );
      slider.setConfig({
        textField: ['.text-field', '.text-field2'],
        sliderType: 'range',
        isInvert: true,
        isVertical: true,
        isScale: true,
        isLabel: true,
      });
    });

    tests();
  });

  describe('isInvert == false.', () => {
    beforeEach(() => {
      setFixtures(
        '<input class="text-field"></input><input class="text-field2"></input>'
      );
      slider.setConfig({
        textField: ['.text-field', '.text-field2'],
        sliderType: 'progress',
        isInvert: false,
        isVertical: false,
        isScale: true,
      });
    });
    tests();
  });
});
