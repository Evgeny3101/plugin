import {Model} from './modules/model'
import {View} from './modules/view'
import {Controller} from './modules/controller'

class RangeSlider {
  [x: string]: any;

  constructor(id: string, dataset: {}) {
    this.model      = new Model(dataset);
    this.view       = new View(id);
    this.controller = new Controller(this.model, this.view);
  }
}

export {RangeSlider}