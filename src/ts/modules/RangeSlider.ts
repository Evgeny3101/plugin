import Controller from './controller';
import Config from './interface/config';
import Model from './model';
import View from './view';

class RangeSlider {
  mainDOM: Element;
  config: Config;
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(mainElemet: Element, config: Config) {
    this.mainDOM = mainElemet;
    this.config = config;
    this.init();
  } // constructor

  init() {
    this.model = new Model(this.config);
    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view, this.config);
  }

  setNewConfig(config: Config) {
    this.config = config;
    this.mainDOM.innerHTML = '';
    this.init();
  }
} // class

export default RangeSlider;
