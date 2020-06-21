import {Model} from './modules/model'
import {View} from './modules/view'
import {Controller} from './modules/controller'

class RangeSlider {
  [x: string]: any;

  constructor(id: string, data?: {}) {
    this.model      = new Model(data);
    this.view       = new View(id);
    this.controller = new Controller(this.model, this.view)

    let self        = this
    // автоматическое обновление при изменении ширины экрана
    window.addEventListener('resize', self.resize.bind(self))
  }

  dataset(data?): void {
    this.model.dataset(data)
    this.controller.setBtn(this.model, this.view)
    this.view.setTextField(this.model.textField, this.model.value)
    this.controller.update(this.model, this.view)
  }


  // автоматическое обновление при изменении ширины экрана
  resize(): void {
    this.controller.update(this.model, this.view)
  }



}



export {RangeSlider}