import '../../src/jquery-wrapper';
import View from '../../src/components/view/view';
import Config from '../../src/components/interface/IConfig';

let $elem: JQuery<HTMLElement>;
let view: View;
let config: Config;

setFixtures(
  '<div class="js-plugin"></div>'
);

$elem = $('.js-plugin');
$elem.rangeSlider();

describe('Класс View.', () => {
  beforeEach(() => {
    setFixtures(
      '<input class="text-field"></input><input class="text-field2"></input>'
    );

    $elem.rangeSlider('config', {
      textField: ['.text-field', '.text-field2'],
      sliderType: 'range',
      isScale :  true,
      isLabel :  true,
      isLabelOnClick :  true,
    });

    view = $elem.rangeSlider.sliders[0].view;
    config = view.defaultConfig;
  });

  it('Метод "setPositionVariables". Установка требуемых переменных.', () => {
    config.isVertical = false;
    config.isInvert = false;
    view.setPositionVariables();
    expect(view.pos.offset).toEqual('left');

    config.isVertical = false;
    config.isInvert = true;
    view.setPositionVariables();
    expect(view.pos.offset).toEqual('right');

    config.isVertical = true;
    config.isInvert = false;
    view.setPositionVariables();
    expect(view.pos.offset).toEqual('top');

    config.isVertical = true;
    config.isInvert = true;
    view.setPositionVariables();
    expect(view.pos.offset).toEqual('bottom');
  });


  it('Метод "installComponents". Элементы DOM определены.', () => {
    expect(view.range.DOM).toBeDefined();
    expect(view.button[0].DOM).toBeDefined();
    expect(view.button[1].DOM).toBeDefined();
    expect(view.label[1].DOM).toBeDefined();
    expect(view.label[1].DOM).toBeDefined();
    expect(view.interval.DOM).toBeDefined();
    expect(view.textField[0].DOM).toBeDefined();
    expect(view.textField[1].DOM).toBeDefined();
  });


  it('Метод "setValues". Устанавливает значения слайдера в текстовые поля.', () => {
    view.setValues([-50, 50]);

    expect(view.textField[0].DOM).toHaveValue('-50');
    expect(view.textField[1].DOM).toHaveValue('50');


    expect(view.label[0].input).toHaveValue('-50');
    expect(view.label[1].input).toHaveValue('50');
  });

  it('Метод "resizeSlider". Изменяет размеры слайдера.', () => {
    const spyEvent = spyOnEvent(window, 'resize');

    const resize = new Event('resize');
    window.dispatchEvent(resize);

    expect('resize').toHaveBeenTriggeredOn(window);
    expect(spyEvent).toHaveBeenTriggered();
  });


  it('Метод "removeListeners". Удаляет слушатели.', () => {
    view.removeListeners();
    const spyMethod = spyOn(view, 'setValues');
    const spyEvent = spyOnEvent(window, 'resize');

    const resize = new Event('resize');
    window.dispatchEvent(resize);

    expect(spyEvent).toHaveBeenTriggered();
    expect(spyMethod).not.toHaveBeenCalled();
  });

});
