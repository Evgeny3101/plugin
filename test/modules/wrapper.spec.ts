import '../../src/jquery-wrapper';


setFixtures(
  '<div class="js-plugin"></div>'
);
const $elem = $('.js-plugin').rangeSlider();

let $input1: JQuery<HTMLElement>;
let $input2: JQuery<HTMLElement>;


describe('Обертка JQuery.', () => {
  beforeEach(() => {
    setFixtures(
      '<input class="text-field"></input><input class="text-field2"></input>'
    );

    $input1 = $('.text-field');
    $input2 = $('.text-field2');

    $elem.rangeSlider('config', {
      sliderValues: [10, 20],
      sliderType: 'range',
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

  it('Вызывается на конкретном слайдере.', () => {
    setFixtures(
      `<div class="js-plugin"></div>
      <div class="js-plugin"></div>`
    );

    const sliders = document.querySelectorAll('.js-plugin');
    const $slider1 = $(sliders[0]).rangeSlider();
    const $slider2 = $(sliders[1]).rangeSlider();

    expect($slider1).not.toEqual($slider2);
  });

  it('Метод "setListeners". Определен.', () => {
    expect($elem.rangeSlider('setListeners')).toBeDefined();
  });

  it('Метод "setListeners". Вызывает установку слушателей.', () => {
    const spyListeners = spyOn($elem, 'rangeSlider');
    spyListeners('setListeners');
    expect(spyListeners).toHaveBeenCalledWith('setListeners');
  });

  it('Метод "removeListeners". Определен.', () => {
    expect($elem.rangeSlider('removeListeners')).toBeDefined();
  });

  it('Метод "removeListeners". Вызывает удаление слушателей.', () => {
    const spyListeners = spyOn($elem, 'rangeSlider');
    spyListeners('removeListeners');
    expect(spyListeners).toHaveBeenCalledWith('removeListeners');
  });

  it('Метод "falseMethod". Не определен.', () => {
    expect(() => {
      $elem.rangeSlider('falseMethod', {});
    }).toThrowError();
  });

  it('Метод "config". Определен.', () => {
    expect($elem.rangeSlider('config', {})).toBeDefined();
  });

  it('Метод "config". Изменяет конфигурацию.', () => {
    $elem.rangeSlider('config', {
      value1Slider: -20,
      value2Slider: 20,
    });

    expect($input1).toHaveValue('-20');
    expect($input2).toHaveValue('20');
  });

  it('Метод "delete". Определен.', () => {
    expect($elem.rangeSlider('delete')).toBeDefined();
  });

  it('Метод "delete". Удаляет слайдер.', () => {
    $elem.rangeSlider('delete');
    $elem.rangeSlider('config', {
      sliderValues: [-20, 20],
    });

    expect($input1).not.toHaveValue('-20');
    expect($elem[0].children[0]).not.toHaveClass('js-range-slider');
  });
});
