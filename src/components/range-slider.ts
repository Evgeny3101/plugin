import IConfig from './interface/IConfig';
import View from './view/view';
import Model from './model';
import Controller from './controller';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;
  mainDOM!: HTMLElement;
  defaultConfig: any;
  currentConfig!: IConfig;

  constructor(id: string, config: IConfig) {
    this.defaultConfig = {
      sliderType: 'single',

      sliderValues: [-25, 25],
      minValue: 0,
      maxValue: 100,
      step: 1,
      textField: [],

      isVertical: false,
      isInvert: false,

      isLabel: false,
      isLabelOnClick: false,

      isScale: false,
      points: 13,
      numberForEach: 4,
      longForEach: 2,
    };

    this.findDOM(id);
    this.setConfig(config);
  }

  setConfig(config: any) {
    const newConfig = { ...this.defaultConfig, ...this.currentConfig, ...config };
    const { sliderType, value1Slider, value2Slider } = config;

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

    delete newConfig.sliderType;

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
        elem.hide();
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
        elem.show();
        view.button[i].DOM.removeEventListener('mousedown', elem.handleButtonMousedown);
        document.removeEventListener('mouseup', elem.handleButtonMouseup);
      });
    }
  }

  delete() {
    this.removeListeners();
    this.mainDOM.innerHTML = '';
  }

  private findDOM(id: string) {
    const elem: HTMLElement | null = document.querySelector(id);
    if (!elem) throw new Error('Main DOM element not found.');
    this.mainDOM = elem;
  }
} // class

export default RangeSlider;
