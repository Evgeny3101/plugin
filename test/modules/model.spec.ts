import '../../src/jquery-wrapper';
import Model from '../../src/components/model';
import IConfig from '../../src/components/interface/IConfig';
import RangeSlider from '../../src/components/range-slider';

const $: any = jQuery;

const { defaultConfig } = $.fn.rangeSlider;
const slider = new RangeSlider('.js-plugin', {}, defaultConfig);
let model: Model;
let config: IConfig;

describe('Класс Model.', () => {
  beforeEach(() => {
    model = new Model(slider.currentConfig);
    config = model.config;
  });

  it('Метод "checkLimit". Проверяет лимиты и возвращает значение. Должно вернуть [-100] и [100].', () => {
    expect(model.checkLimit([-999])).toEqual([-100]);
    expect(model.checkLimit([999])).toEqual([100]);
  });

  it('Метод "putInStep". Проверяет шаг и возвращает значение. Должно вернуть [-20, 81].', () => {
    config.step = 1;
    config.sliderValues = [-19.51, 81.49];
    expect(model.putInStep(config.sliderValues)).toEqual([-20, 81]);
  });
});
