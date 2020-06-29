import {Model} from './modules/model'
import {View} from './modules/view'
import {Controller} from './modules/controller'

class RangeSlider {
  model: Model;
  view: View;
  controller: Controller;

  constructor(id: string, data?: {}) {
    this.model      = new Model(data);
    this.view       = new View(id);
    this.controller = new Controller(this.model, this.view)
  }

  dataset(data?): void {
    this.model.dataset(data)
    this.controller.init(this.model, this.view)
    this.view.setTextField(this.model.textField)
    this.controller.update(this.model, this.view)
  }

}



export {RangeSlider}