import '../src/ts/main';

let elem: JQuery<HTMLElement>;
let input: JQuery<HTMLElement>;
let input2: JQuery<HTMLElement>;

describe('jquery.rangeSlider.', () => {
  beforeEach(() => {
    setFixtures(
      '<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>'
    );
    elem = $('.js-plugin');
    input = $('.text-field');
    input2 = $('.text-field2');
  });

  it('Must be available in jquery object.', () => {
    expect($.fn.rangeSlider).toBeDefined();
  });

  it('Must have a chain method of calling.', () => {
    expect(elem.rangeSlider()).toBe(elem);
  });

  it('Must be initialized.', () => {
    elem.rangeSlider({
      value: [-33, 33],
      range: true,
      textField: ['.text-field', '.text-field2'],
    });
    expect(input.val()).toBe('-33');
    expect(input2.val()).toBe('33');
  });

  it('The "config" method must not be defined', () => {
    expect(elem.rangeSlider('config', {})).toBeDefined();
  });

  it('The "falseMethod" method must not be defined.', () => {
    expect(() => {
      elem.rangeSlider('falseMethod', {});
    }).toThrowError();
  });

  it('Must be change by the "config" method.', () => {
    elem.rangeSlider({
      value: [10, 20],
      range: true,
      textField: ['.text-field', '.text-field2'],
    });
    elem.rangeSlider('config', {
      value: [-20, 20],
    });

    expect(input.val()).toBe('-20');
    expect(input2.val()).toBe('20');
  });
});
