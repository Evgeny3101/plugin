import IConfig from './components/interface/IConfig';
import Controller from './components/controller';
import Model from './components/model';
import View from './components/view/view';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;

  constructor(public mainDOM: Element, public config: IConfig) {
    this.customizationConfig(this.config);
    this.init();
  } // constructor

  init() {
    this.model = new Model(this.config);
    // after checking the limits and step
    this.config.sliderValues = this.model.value;

    this.view = new View(this.mainDOM, this.config);
    this.controller = new Controller(this.model, this.view);
  }

  setNewConfig(config: IConfig) {
    this.customizationConfig(config);
    this.init();
  }

  private customizationConfig(options: any) {
    const newConfig = options;
    const { sliderType, sliderValues1, sliderValues2 } = options;
    if (typeof sliderValues1 === 'number') newConfig.sliderValues[0] = [sliderValues1];
    if (typeof sliderValues2 === 'number') newConfig.sliderValues[1] = [sliderValues2];
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
