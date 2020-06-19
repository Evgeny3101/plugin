import {Model} from './modules/model'
import {View} from './modules/view'
import {Controller} from './modules/controller'

class RangeSlider {
  [x: string]: any;

  constructor(id: string, data?: {}) {
    this.model      = new Model(data);
    this.view       = new View(id);
    this.controller = new Controller(this.model, this.view)
  }

  dataset(data?): void {
    this.model.dataset(data)
    this.view.setTextField(this.model.textField, this.model.value)
  }

}



export {RangeSlider}