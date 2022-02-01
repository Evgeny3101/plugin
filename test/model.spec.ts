import '../src/plugin/jquery-wrapper';
import Model from '../src/plugin/model';
import IConfig from '../src/plugin/interface/IConfig';
import RangeSlider from '../src/plugin/range-slider';

const $: any = jQuery;
let model: any;
let config: IConfig;

const { defaultConfig } = $.fn.rangeSlider;
const { currentConfig } = new RangeSlider('.js-plugin', {}, defaultConfig);

describe('Класс Model.', () => {
  beforeEach(() => {
    model = new Model(currentConfig);
    config = model.config;
  });

  it('Метод "checkLimit". Проверяет лимиты и возвращает значение. Должно вернуть [-100] и [100].', () => {
    expect(model.checkLimit([-999])).toEqual([-100]);
    expect(model.checkLimit([999])).toEqual([100]);
  });

  it('Метод "putInStep". Проверяет шаг и возвращает значение. Должно вернуть [-20, 81].', () => {
    config.sliderValues = [-19.51, 81.49];
    expect(model.putInStep(config.sliderValues)).toEqual([-20, 81]);
  });
});
