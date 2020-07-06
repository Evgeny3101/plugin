import { Model } from '../ts/modules/model'
import { View } from '../ts/modules/view'
import { Controller } from '../ts/modules/controller'

(function($){

  class RangeSlider {
    model: Model
    view: View
    controller: Controller

    constructor(id: Element, config: {}) {
      this.model      = new Model(config)
      this.view       = new View(id, config)
      this.controller = new Controller(this.model, this.view, config)

    } // constructor
  } // class

  let config, methods = {
    init: function(options) {
      return this.each(function() {
        config = $.extend({}, $.fn.rangeSlider.defaults, options)
        new RangeSlider(this, config)
      })
    },

    config: function(options) {
      return this.each(function() {
        this.innerHTML = ''

        config = $.extend({}, $.fn.rangeSlider.defaults, options)
        new RangeSlider(this, config)
      })
    }
  }

  $.fn.rangeSlider = function(method) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.rangeSlider' );
    }
  }

  $.fn.rangeSlider.defaults = {
    value         :  [-25, 25],
    minValue      :  -100,
    maxValue      :  100,
    step          :  0.1,
    textField     :  [],

    range         :  false,
    vertical      :  false,
    invert        :  false,

    lable         :  false,
    lableOnClick  :  false,

    scale         :  false,
    points        :  13,
    numberForEach :  4,
    longForEach   :  2,
  }

}(jQuery));

