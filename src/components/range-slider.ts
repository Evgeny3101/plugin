import IConfig from './interface/IConfig';
import View from './view/view';
import Model from './model';
import Controller from './controller';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;
  mainDOM!: HTMLElement;
  currentConfig!: IConfig;

  constructor(id: string | HTMLElement, config: {}, public defaultConfig: any) {
    this.findDOM(id);
    this.setConfig(config);
  }

  setConfig(config: any) {
    const newConfig = { ...this.defaultConfig, ...this.currentConfig, ...config };
    const { sliderType, value1Slider, value2Slider } = newConfig;

    if (typeof value1Slider === 'number') {
      newConfig.sliderValues[0] = value1Slider;
      delete newConfig.value1Slider;
    }
    if (typeof value2Slider === 'number') {
      newConfig.sliderValues[1] = value2Slider;
      delete newConfig.value2Slider;
    }
    if (sliderType) {
      newConfig.isSingle = sliderType === 'single';
      newConfig.isRange = sliderType === 'range';
      newConfig.isProgress = sliderType === 'progress';
    }

    this.currentConfig = newConfig;
    this.init();
  }

  init() {
    this.model = new Model(this.currentConfig);
    this.currentConfig.sliderValues = this.model.config.sliderValues; // после проверки лимитов и шага в Model
    this.view = new View(this.mainDOM, this.currentConfig);
    this.controller = new Controller(this.model, this.view, this.currentConfig);
    this.setListeners();
  }

  setListeners() {
    const { view } = this.controller;
    const isLabelOnClick =
      this.currentConfig.isLabel && this.currentConfig.isLabelOnClick;

    window.addEventListener('resize', view.handleWindowResize);

    view.button.forEach((btn) => {
      btn.DOM.addEventListener('mousedown', btn.handleButtonMousedown);
    });

    view.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.addEventListener('blur', elem.handleTextFieldBlur);
      }
    });

    if (view.scale) {
      view.scale.points.forEach((elem) => {
        elem.DOM.addEventListener('click', elem.handlePointClick);
      });
    }

    if (isLabelOnClick) {
      view.label.forEach((elem, i) => {
        elem.handleButtonMouseup();
        view.button[i].DOM.addEventListener('mousedown', elem.handleButtonMousedown);
        document.addEventListener('mouseup', elem.handleButtonMouseup);
      });
    }
  }

  removeListeners() {
    const { view } = this.controller;
    const isLabelOnClick =
      this.currentConfig.isLabel && this.currentConfig.isLabelOnClick;

    window.removeEventListener('resize', view.handleWindowResize);

    view.button.forEach((btn) => {
      btn.DOM.removeEventListener('mousedown', btn.handleButtonMousedown);
    });

    view.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.removeEventListener('blur', elem.handleTextFieldBlur);
      }
    });

    if (view.scale) {
      view.scale.points.forEach((elem) => {
        elem.DOM.removeEventListener('click', elem.handlePointClick);
      });
    }

    if (isLabelOnClick) {
      view.label.forEach((elem, i) => {
        elem.handleButtonMousedown();
        view.button[i].DOM.removeEventListener('mousedown', elem.handleButtonMousedown);
        document.removeEventListener('mouseup', elem.handleButtonMouseup);
      });
    }
  }

  delete() {
    this.removeListeners();
    this.mainDOM.innerHTML = '';
  }

  private findDOM(id: string | HTMLElement) {
    let elem;
    if (typeof id === 'string') elem = <HTMLElement>document.querySelector(id);
    else elem = id;
    if (!elem) throw new Error('Main DOM element not found.');

    this.mainDOM = elem;
  }
} // class

export default RangeSlider;
