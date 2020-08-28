import IConfig from './components/interface/IConfig';
import RangeSlider from './plugin-api';

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
    return $.error(`Method named ${method} does not exist for jQuery.rangeSlider`);
  };

  $.fn.rangeSlider.defaults = {
    sliderType: 'range',

    sliderValues: [-25, 25],
    minValue: -100,
    maxValue: 100,
    step: 0.1,
    textField: [],

    isVertical: false,
    isInvert: false,

    isLabel: false,
    isLabelOnClick: false,

    isScale: false,
    points: 13,
    numberForEach: 4,
    longForEach: 2,
  };
})(jQuery);
