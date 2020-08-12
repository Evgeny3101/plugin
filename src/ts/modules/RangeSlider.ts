import IConfig from './interface/IConfig';
import Controller from './controller';
import Model from './model';
import View from './view';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(public mainDOM: Element, public config: IConfig) {
    this.init();
  } // constructor

  init() {
    this.model = new Model(this.config);
    this.config.sliderValues = this.model.value;
    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view);
  }

  setNewConfig(config: IConfig) {
    this.config = config;
    this.mainDOM.innerHTML = '';
    this.init();
  }
} // class

export default RangeSlider;
