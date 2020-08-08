import IConfig from './interface/IConfig';
import Controller from './controller';
import Model from './model';
import View from './view';

class RangeSlider {
  mainDOM: Element;
  config!: IConfig;
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(mainElement: Element, config: IConfig) {
    this.mainDOM = mainElement;
    this.init(config);
  } // constructor

  init(config: IConfig) {
    this.config = config;
    this.model = new Model(this.config);
    this.config.sliderValues = this.model.value;
    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view, this.config);
  }

  setNewConfig(config: IConfig) {
    this.mainDOM.innerHTML = '';
    this.init(config);
  }
} // class

export default RangeSlider;
