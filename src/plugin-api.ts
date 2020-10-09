import IConfig from './components/interface/IConfig';
import Controller from './components/controller';
import Model from './components/model';
import View from './components/view/view';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(public mainDOM: Element, public config: IConfig) {
    this.setNewConfig(this.config);
    this.init();
  } // constructor

  init() {
    this.model = new Model(this.config);
    // after checking the limits and step
    this.config.sliderValues = this.model.value;

    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view);
  }

  setNewConfig(options: any) {
    const newConfig = options;
    const { sliderType, value1slider, value2slider } = options;
    if (typeof value1slider === 'number') newConfig.sliderValues[0] = [value1slider];
    if (typeof value2slider === 'number') newConfig.sliderValues[1] = [value2slider];
    if (sliderType) {
      newConfig.isSingle = sliderType === 'single';
      newConfig.isRange = sliderType === 'range';
      newConfig.isProgress = sliderType === 'progress';
    }

    delete newConfig.sliderType;

    this.config = newConfig;
  }
} // class

export default RangeSlider;
