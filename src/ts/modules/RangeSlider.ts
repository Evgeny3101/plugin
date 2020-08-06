import IConfig from './interface/config';
import Controller from './controller';
import Model from './model';
import View from './view';

class RangeSlider {
  mainDOM: Element;
  config: IConfig;
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(mainElement: Element, config: IConfig) {
    this.mainDOM = mainElement;
    this.config = config;
    this.init();
  } // constructor

  init() {
    this.model = new Model(this.config);
    this.config.value = this.model.value;
    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view, this.config);
  }

  setNewConfig(config: IConfig) {
    this.config = config;
    this.mainDOM.innerHTML = '';
    this.init();
  }
} // class

export default RangeSlider;
