import IConfig from './interface/IConfig';
import View from './view/view';
import Model from './model';
import Controller from './controller';

class RangeSlider {
  elem!: HTMLElement;
  model!: Model;
  view!: View;
  controller!: Controller;
  currentConfig!: IConfig;

  constructor(id: string | HTMLElement, config: {}, public defaultConfig?: any) {
    if(defaultConfig === undefined) this.defaultConfig = {
      sliderType: 'single',
      sliderValues: [-25, 25],
      minValue: -100,
      maxValue: 100,
      step: 10,
      textField: [],
      isVertical: false,
      isInvert: false,
      isLabel: false,
      isLabelOnClick: false,
      isScale: false,
      pointsForEach: 1,
      numberForEach: 4,
      longForEach: 2,
    };
    this.findDOM(id);
    this.init(config);
  }

  init(config: any) {
    this.model = new Model(config, this.currentConfig, this.defaultConfig);
    // после проверки лимитов и шага в Model
    this.currentConfig = this.model.config; 
    this.view = new View(this.elem, this.currentConfig);
    this.controller = new Controller(this.model, this.view, this.currentConfig);
    this.setListeners();
  }
  
  delete() {
    this.removeListeners();
    this.elem.innerHTML = '';
  }

  setListeners() {
    this.view.setListeners();
  }

  removeListeners() {
    this.view.removeListeners();
  }

  private findDOM(id: string | HTMLElement) {
    let elem;
    if (typeof id === 'string') elem = <HTMLElement>document.querySelector(id);
    else elem = id;
    if (!elem) throw new Error('Main DOM element not found.');

    this.elem = elem;
  }
} // class

export default RangeSlider;
