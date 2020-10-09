import IConfig from './components/interface/IConfig';
import RangeSlider from './plugin-api';

((jQuery) => {
  const $ = jQuery;

  const methods: { [key: string]: Function } = {
    init(options: {}) {
      return this.each((index: number, elem: Element) => {
        const config: IConfig = $.extend({}, $.fn.rangeSlider.defaults, options);
        const newSlider = new RangeSlider(elem, config);

        $.fn.rangeSlider.sliders.push(newSlider);
      });
    },

    delete() {
      return this.each((index: number, elem: Element) => {
        $.fn.rangeSlider.sliders.forEach((slider, i) => {
          if (slider.mainDOM === elem) {
            slider.view.removeListeners();
            $(slider.mainDOM).empty();
            delete $.fn.rangeSlider.sliders[i];
          }
          return false;
        });
      });
    },

    config(options: {}) {
      return this.each((index: number, elem: Element) => {
        $.fn.rangeSlider.sliders.forEach((slider) => {
          if (slider.mainDOM === elem) {
            $(slider.mainDOM).empty();
            const config = $.extend({}, slider.config, options);
            slider.setNewConfig(config);
            return slider.init();
          }
          return false;
        });
      });
    },

    setListeners() {
      return this.each((index: number, elem: Element) => {
        $.fn.rangeSlider.sliders.forEach((slider) => {
          if (slider.mainDOM === elem) {
            slider.view.setListeners();
            return false;
          }
          return false;
        });
      });
    },

    removeListeners() {
      return this.each((index: number, elem: Element) => {
        $.fn.rangeSlider.sliders.forEach((slider) => {
          if (slider.mainDOM === elem) {
            slider.view.removeListeners();
            return false;
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

  // Настройки по умолчанию
  $.fn.rangeSlider.defaults = {
    sliderType: 'single',

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

  // Массив для слайдеров
  $.fn.rangeSlider.sliders = [];
})(jQuery);
