import {Model} from '../ts/modules/model'
import {View} from '../ts/modules/view'
import {Controller} from '../ts/modules/controller'

(function( $ ) {
  class RangeSlider {
    model: Model;
    view: View;
    controller: Controller;

    constructor(id: Element, settings?: {}) {
      this.model      = new Model(settings);

      this.view       = new View(id);
      this.controller = new Controller(this.model, this.view)
    }

    dataset(data?): void {
      this.model.dataset(data)
      this.controller.init(this.model, this.view)
      this.controller.update(this.model, this.view)
    }
  }

  let slider = null

  const defaults = {
    value               : [-100, 100],
  }

  const methods = {
    init : function( options? ) {
      let empty = {}
      let settings = $.extend(empty, defaults, options);

      slider = new RangeSlider(this[0], settings)
    },

    update : function( ) {
    },

    show : function( ) {
    },

    hide : function( ) {
    },

    settings : function (options) {
      let empty = {}
      let settings = $.extend(empty, defaults, options);

      slider.dataset(settings)
    }
  };


  $.fn.rangeSlider = function(method) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    }
  }

})(jQuery)