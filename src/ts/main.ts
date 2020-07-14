/* eslint-disable no-param-reassign */
import Model from './modules/model';
import View from './modules/view';
import Controller from './modules/controller';
import Config from './modules/interface/config';

(($) => {
  class RangeSlider {
    model: Model;
    view: View;
    controller: Controller;

    constructor(id: Element, config: Config) {
      id.innerHTML = '';
      this.model = new Model(config);
      this.view = new View(id, config);
      this.controller = new Controller(this.model, this.view, config);
    } // constructor

    dataset(config: Config) {
      this.model.update(config);
      this.view.update(config);
      this.controller.update(config);
    }
  } // class

  const slider: RangeSlider[] = [];
  let config: Config;
  const methods: { [key: string]: Function } = {
    init(options: {}): Element {
      return this.each((index: number, value: Element) => {
        config = $.extend({}, $.fn.rangeSlider.defaults, options);

        slider[index] = new RangeSlider(value, config);
      });
    },

    config(options: {}): Element {
      return this.each((index: number, value: Element) => {
        config = $.extend({}, $.fn.rangeSlider.defaults, options);

        slider[index] = new RangeSlider(value, config);
        // slider[index].dataset(config);
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

    lable: false,
    lableOnClick: false,

    scale: false,
    points: 13,
    numberForEach: 4,
    longForEach: 2,
  };
})(jQuery);
