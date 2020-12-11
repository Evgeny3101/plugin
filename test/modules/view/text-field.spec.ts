import '../../../src/jquery-wrapper';
import RangeSlider from '../../../src/components/range-slider';
import TextField from '../../../src/components/view/text-field';

const $: any = jQuery;

setFixtures('<div class="js-plugin"></div>');

const { defaultConfig } = $.fn.rangeSlider;
const slider = new RangeSlider('.js-plugin', {}, defaultConfig);
let input: HTMLInputElement;
let textField: TextField;
let spyObservable: jasmine.Spy<(data: any) => void>;

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

  it('Метод "getValue". Обрабатывает значение введенное в текстовое поле.', () => {
    input.value = '-120';
    textField.getValue();

    expect(spyObservable).toHaveBeenCalledWith({
      value: -120,
      index: 0,
    });
  });

  it('Метод "getValue". Если значение введенное в текстовое поле не определено примет как "0".', () => {
    input.value = undefined!;
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });

    input.value = null!;
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });

    input.value = 'sdf';
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });

    input.value = ''!;
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: 0,
      index: 0,
    });
  });

  it('Метод "getValue". Обрабатывает значение введенное в HTMLElement.', () => {
    const textField2 = <TextField>slider.view.textField[1];
    const input2 = <HTMLInputElement>textField2.DOM;
    const spyObservable2 = spyOn(textField2.Observable, 'notify');

    input2.innerText = '120';
    textField2.getValue();

    expect(spyObservable2).toHaveBeenCalledWith({
      value: 120,
      index: 1,
    });
  });
});
