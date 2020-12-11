import '../../src/jquery-wrapper';
import RangeSlider from '../../src/components/range-slider';
import View from '../../src/components/view/view';

const $: any = jQuery;

setFixtures('<div class="js-plugin"></div>');

const { defaultConfig } = $.fn.rangeSlider;
const slider = new RangeSlider('.js-plugin', {}, defaultConfig);
let view: View;

describe('Класс RangeSlider.', () => {
  beforeEach(() => {
    setFixtures('<input class="text-field"></input><input class="text-field2"></input>');

    slider.setConfig({
      textField: ['.text-field', '.text-field2'],
      sliderType: 'range',
      isScale: true,
      isLabel: true,
      isLabelOnClick: true,
    });

    view = slider.view;
  });

  it('Метод "removeListeners". Удаляет слушатели.', () => {
    slider.removeListeners();
    const spyMethod = spyOn(view, 'setValues');
    const spyEvent = spyOnEvent(window, 'resize');

    const resize = new Event('resize');
    window.dispatchEvent(resize);

    expect(spyEvent).toHaveBeenTriggered();
    expect(spyMethod).not.toHaveBeenCalled();
  });
});
