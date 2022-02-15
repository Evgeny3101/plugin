import RangeSlider from './range-slider';

((jQuery) => {
  const $: any = jQuery;

  const methods: { [key: string]: Function } = {
    init(options: {}) {
      return this.each((index: number, elem: HTMLElement) => {
        const newSlider = new RangeSlider(elem, options, $.fn.rangeSlider.defaultConfig);

        $.fn.rangeSlider.sliders.push(newSlider);
      });
    },

    delete() {
      return this.each((index: number, elem: HTMLElement) => {
        $.fn.rangeSlider.sliders.forEach((slider: RangeSlider, i: number) => {
          if (slider.elem === elem) {
            slider.delete();
            delete $.fn.rangeSlider.sliders[i];
          }
          return false;
        });
      });
    },

    config(options: {}) {
      return this.each((index: number, elem: HTMLElement) => {
        $.fn.rangeSlider.sliders.forEach((slider: RangeSlider) => {
          if (slider.elem === elem) {
            slider.delete();
            slider.init(options);
          }
          return false;
        });
      });
    },

    setListeners() {
      return this.each((index: number, elem: HTMLElement) => {
        $.fn.rangeSlider.sliders.forEach((slider: RangeSlider) => {
          if (slider.elem === elem) {
            slider.setListeners();
          }
          return false;
        });
      });
    },

    removeListeners() {
      return this.each((index: number, elem: HTMLElement) => {
        $.fn.rangeSlider.sliders.forEach((slider: RangeSlider) => {
          if (slider.elem === elem) {
            slider.removeListeners();
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

  // Массив для слайдеров
  $.fn.rangeSlider.sliders = [];

  $.fn.rangeSlider.defaultConfig = {
    sliderType: 'single',

    sliderValues: [-25, 25],
    minValue: -100,
    maxValue: 100,
    step: 10,
    textField: [],

    isVertical: false,
    isInvert: false,

    isLabel: false,
    isLabelOnClick: false,

    isScale: false,
    pointsForEach: 1,
    numberForEach: 4,
    longForEach: 2,
  };
})(jQuery);
