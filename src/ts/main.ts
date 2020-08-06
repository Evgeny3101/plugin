import IConfig from './modules/interface/config';
import RangeSlider from './modules/RangeSlider';

((jQuery) => {
  const $ = jQuery;
  const sliders: RangeSlider[] = [];

  const methods: { [key: string]: Function } = {
    init(options: {}): Element {
      return this.each((index: number, elem: Element) => {
        const config: IConfig = $.extend({}, $.fn.rangeSlider.defaults, options);
        const newSlider = new RangeSlider(elem, config);
        sliders.push(newSlider);
      });
    },

    config(options: {}): Element {
      return this.each((index: number, elem: Element) => {
        sliders.forEach((slider) => {
          if (slider.mainDOM === elem) {
            const config = $.extend({}, slider.config, options);
            return slider.setNewConfig(config);
          }
          return false;
        });
      });
    },
  };

  $.fn.rangeSlider = function rangeSlider(method: string, ...args: [{}]) {
    if (methods[method]) {
      return methods[method].apply(this, args);
    }
    if (typeof method === 'object' || !method) {
      const data = method;
      return methods.init.apply(this, [data]);
    }
    return $.error(`Метод с именем ${method} не существует для jQuery.rangeSlider`);
  };

  $.fn.rangeSlider.defaults = {
    value: [-25, 25],
    minValue: -100,
    maxValue: 100,
    step: 0.1,
    textField: [],

    range: false,
    vertical: false,
    invert: false,

    label: false,
    labelOnClick: false,

    scale: false,
    points: 13,
    numberForEach: 4,
    longForEach: 2,
  };
})(jQuery);
