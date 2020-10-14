import '../../src/jquery-wrapper';
import Controller from '../../src/components/controller';
import Config from '../../src/components/interface/IConfig';
import Model from '../../src/components/model';
import View from '../../src/components/view/view';


setFixtures(
  '<div class="js-plugin"></div>'
);

const $elem = $('.js-plugin').rangeSlider();
let controller: Controller;
let model: Model;
let view: View;
let config: Config;


const tests = () => {
  beforeEach(() => {
    controller = $elem.rangeSlider.sliders[0];
    model = controller.model;
    view = controller.view;
    config = $elem.rangeSlider.sliders[0].config;
  });


  it('Метод "subscribeToChangeValue". Подписка на изменения значения слайдера, методом "Model.updateValue".', () => {
    controller.subscribeToChangeValue();
    const spyMethod = spyOn(controller.view, 'setValues');

    controller.model.updateValue(11, 0);
    controller.model.updateValue(33, 1);

    expect(spyMethod).toHaveBeenCalledWith([11, 33]);
  });

  it('Метод "subscribeButtons". Подписка на изменения положения кнопок, методом "Button.move".', () => {
    controller.subscribeButtons();
    const spyMethod = spyOn(controller.model, 'convertCoords');

    const mousedown = new MouseEvent('mousedown');
    controller.view.button[0].DOM.dispatchEvent(mousedown);

    const event = new MouseEvent('mousemove', {
      clientX: 10000,
      clientY: 10000,
    });
    document.dispatchEvent(event);

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Метод "subscribeTextField". Подписка на изменения значения в текстовом поле, методом "TextField.getValue".', () => {
    controller.subscribeTextField();
    const spyMethod = spyOn(controller.model, 'updateValue');

    controller.view.textField[0].getValue();

    expect(spyMethod).toHaveBeenCalled();
  });


  it('Метод "subscribePoint". Подписка на клик по шкале, методом "Point.clickPoint".', () => {
    controller.subscribePoint();
    const spyMethod = spyOn(controller.model, 'updateValue');

    controller.view.scale?.points[0].clickPoint();
    controller.view.scale?.points[12].clickPoint();

    expect(spyMethod).toHaveBeenCalled();
  });

};


describe('Класс Controller.', () => {
  describe('isInvert == true.', () => {
    beforeEach(() => {
      setFixtures(
        '<input class="text-field"></input><input class="text-field2"></input>'
      );

      $elem.rangeSlider('config', {
        textField: ['.text-field', '.text-field2'],
        sliderType: 'range',
        isInvert :  true,
        isVertical: true,
        isScale :  true,
        isLabel :  true,
        isLabelOnClick :  true,
      });

    });

    tests();
  });

  describe('isInvert == false.', () => {
    beforeEach(() => {
      setFixtures(
        '<input class="text-field"></input><input class="text-field2"></input>'
      );

      $elem.rangeSlider('config', {
        textField: ['.text-field', '.text-field2'],
        sliderType: 'progress',
        isInvert :  false,
        isVertical :  false,
        isScale :  true,
      });

    });

    tests();
  });
});