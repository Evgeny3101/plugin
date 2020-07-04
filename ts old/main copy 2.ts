import {Model} from '../ts/modules/model'
import {View} from '../ts/modules/view'
import {Controller} from '../ts/modules/controller'

class RangeSlider {
  model: Model
  view: View
  controller: Controller

  constructor(id: Element, settings?: {}) {
    this.model      = new Model(settings)
    this.view       = new View(id)
    this.controller = new Controller(this.model, this.view)

  } // constructor

  dataset(data?): void {
    this.model.dataset(data)
    this.controller.init(this.model, this.view)
    this.controller.update(this.model, this.view)
  }
} // class

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
  value     : [-25, 25],
  minValue  : -100,
  maxValue  : 100,
}

let slider
let methods = {
  init: function(options) {
    let settings = $.extend({}, $.fn.rangeSlider.defaults, options)
    slider = new RangeSlider(this[0], settings)
  },

  settings: function(options) {
    let settings = $.extend({}, $.fn.rangeSlider.defaults, options)
    slider.dataset(settings)
  },

  update: function(options) {
    let settings = $.extend({}, $.fn.rangeSlider.defaults, options)
    slider.dataset(settings)
  }
}

