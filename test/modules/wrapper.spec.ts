import '../../src/jquery-wrapper';

let $elem: JQuery<HTMLElement>;
let $input1: JQuery<HTMLElement>;
let $input2: JQuery<HTMLElement>;

describe('Обертка JQuery.', () => {
  beforeEach(() => {
    setFixtures(
      '<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>'
    );
    $elem = $('.js-plugin');
    $input1 = $('.text-field');
    $input2 = $('.text-field2');

    $elem.rangeSlider({
      sliderValues: [10, 20],
      range: true,
      textField: ['.text-field', '.text-field2'],
    });
  });

  it('Доступен в объекте JQuery.', () => {
    expect($.fn.rangeSlider).toBeDefined();
  });

  it('Имеет цепной метод вызова.', () => {
    expect($elem.rangeSlider()).toBe($elem);
  });

  it('Плагин инициализирован.', () => {
    expect($input1).toHaveValue('10');
    expect($input2).toHaveValue('20');
  });

  it('Метод "setListeners", определен.', () => {
    expect($elem.rangeSlider('setListeners')).toBeDefined();
  });

  it('Метод "setListeners", вызывает установку слушателей.', () => {
    const spyListeners = spyOn($elem, 'rangeSlider');
    spyListeners('setListeners');
    expect(spyListeners).toHaveBeenCalledWith('setListeners');
  });

  it('Метод "removeListeners", определен.', () => {
    expect($elem.rangeSlider('removeListeners')).toBeDefined();
  });

  it('Метод "removeListeners", вызывает удаление слушателей.', () => {
    const spyListeners = spyOn($elem, 'rangeSlider');
    spyListeners('removeListeners');
    expect(spyListeners).toHaveBeenCalledWith('removeListeners');
  });

  it('Метод "falseMethod", не определен.', () => {
    expect(() => {
      $elem.rangeSlider('falseMethod', {});
    }).toThrowError();
  });

  it('Метод "config", определен.', () => {
    expect($elem.rangeSlider('config', {})).toBeDefined();
  });

  it('Метод "config", изменяет конфигурацию.', () => {
    $elem.rangeSlider('config', {
      // sliderValues: [-20, 20],
      value1slider: -20,
      value2slider: 20,
    });

    expect($input1).toHaveValue('-20');
    expect($input2).toHaveValue('20');
  });

  it('Метод "delete", определен.', () => {
    expect($elem.rangeSlider('delete')).toBeDefined();
  });

  it('Метод "delete", удаляет слайдер.', () => {
    $elem.rangeSlider('delete');
    $elem.rangeSlider('config', {
      sliderValues: [-20, 20],
    });

    expect($input1).not.toHaveValue('-20');
    expect($elem[0].children[0]).not.toHaveClass('js-range-slider');
  });
});
