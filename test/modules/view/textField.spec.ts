import '../../../src/jquery-wrapper';
import TextField from '../../../src/components/view/textField';


setFixtures(
  '<div class="js-plugin"></div>'
);
const $elem = $('.js-plugin').rangeSlider();

let $input1: JQuery<HTMLElement>;
let textField: TextField;
let spyObservable: jasmine.Spy<(data: any) => void>;

describe('Класс TextField.', () => {
  beforeEach(() => {
    setFixtures(
      '<input class="text-field"></input><input class="text-field2"></input>'
    );

    $input1 = $('.text-field');

    $elem.rangeSlider('config', {
      textField: ['.text-field', '.text-field2'],
      sliderType: 'range',
      isScale :  true,
      isLabel :  true,
      isLabelOnClick :  true,
    });

    textField = $elem.rangeSlider.sliders[0].view.textField[0];
    spyObservable = spyOn(textField.Observable, 'notify');

  });

  it('Метод "find". Ошибка если не определен.', () => {
    expect(() => {
      textField.find('.falseField');
    }).toThrowError('Text field not found.');
  });

  it('Метод "getValue". Обрабатывает значение введенное в текстовое поле.', () => {
    $input1.val('-120');
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: [-120],
      index: 0,
    });
  });

  it('Метод "getValue". Если значение введенное в текстовое поле не определено примет как "0".', () => {
    $input1.val(undefined);
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: [0],
      index: 0,
    });

    $input1.val(null);
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: [0],
      index: 0,
    });

    $input1.val('sdf');
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: [0],
      index: 0,
    });

    $input1.val(NaN);
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: [0],
      index: 0,
    });

    $input1.val( );
    textField.getValue();
    expect(spyObservable).toHaveBeenCalledWith({
      value: [0],
      index: 0,
    });
  });

});
