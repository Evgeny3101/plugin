import '../../src/plugin/jquery-wrapper';
import RangeSlider from '../../src/plugin/range-slider';
import TextField from '../../src/plugin/view/text-field';

const $: any = jQuery;
let input: HTMLInputElement;
let textField: TextField;
let spyObservable: jasmine.Spy<(data: any) => void>;

setFixtures('<div class="js-plugin"></div>');
const { defaultConfig } = $.fn.rangeSlider;
const slider = new RangeSlider('.js-plugin', {}, defaultConfig);

describe('Класс TextField.', () => {
  beforeEach(() => {
    setFixtures('<input class="text-field"></input><p class="text-field2"></p>');

    slider.setConfig({
      textField: ['.text-field', '.text-field2'],
      sliderType: 'range',
      isScale: true,
      isLabel: true,
      isLabelOnClick: true,
    });

    textField = <TextField>slider.view.textField[0];
    input = <HTMLInputElement>textField.DOM;
    spyObservable = spyOn(textField.Observable, 'notify');
  });

  it('Метод "find". Ошибка если не определен.', () => {
    expect(() => {
      textField.find('.falseField');
    }).toThrowError('Text field not found.');
  });

  it('Метод "handleTextFieldBlur". Обрабатывает значение введенное в текстовое поле.', () => {
    input.value = '-120';
    textField.handleTextFieldBlur();

    expect(spyObservable).toHaveBeenCalledWith({
      value: -120,
      index: 0,
    });
  });

  it('Метод "handleTextFieldBlur". Если значение введенное в текстовое поле не определено примет как "0".', () => {
    input.value = undefined!;
    textField.handleTextFieldBlur();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });

    input.value = null!;
    textField.handleTextFieldBlur();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });

    input.value = 'sdf';
    textField.handleTextFieldBlur();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });

    input.value = ''!;
    textField.handleTextFieldBlur();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });
  });

  it('Метод "handleTextFieldBlur". Обрабатывает значение введенное в HTMLElement.', () => {
    const textField2 = <TextField>slider.view.textField[1];
    const input2 = <HTMLInputElement>textField2.DOM;
    const spyObservable2 = spyOn(textField2.Observable, 'notify');

    input2.innerText = '120';
    textField2.handleTextFieldBlur();

    expect(spyObservable2).toHaveBeenCalledWith({
      value: 120,
      index: 1,
    });
  });
});
