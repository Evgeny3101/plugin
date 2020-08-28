import IConfig from './components/interface/IConfig';
import Controller from './components/controller';
import Model from './components/model';
import View from './components/view/view';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(public mainDOM: Element, public config: IConfig) {
    this.init();
  } // constructor

  init() {
    this.customizationConfig(this.config);

    this.model = new Model(this.config);
    // after checking the limits and step
    this.config.sliderValues = this.model.value;

    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view);
  }

  setNewConfig(config: IConfig) {
    this.config = config;
    this.mainDOM.innerHTML = '';
    this.init();
  }

  private customizationConfig(options: any) {
    const newConfig = options;
    const { sliderType } = options;

    newConfig.isSingle = sliderType === 'single';
    newConfig.isRange = sliderType === 'range';
    newConfig.isProgress = sliderType === 'progress';

    delete newConfig.sliderType;

    this.config = newConfig;
  }
} // class

export default RangeSlider;
