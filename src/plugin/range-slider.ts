import IConfig from './interface/IConfig';
import View from './view/view';
import Model from './model';
import Controller from './controller';

class RangeSlider {
  model!: Model;
  view!: View;
  controller!: Controller;
  elem!: HTMLElement;
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
    this.setConfig(config);
  }

  init() {
    this.model = new Model(this.currentConfig);
    // после проверки лимитов и шага в Model
    this.currentConfig.sliderValues = this.model.config.sliderValues; 
    this.view = new View(this.elem, this.currentConfig);
    this.controller = new Controller(this.model, this.view, this.currentConfig);
    this.setListeners();
  }

  delete() {
    this.removeListeners();
    this.elem.innerHTML = '';
  }

  setConfig(config: any) {
    const { defaultConfig, currentConfig } = this;
    const baseConfig = { ...defaultConfig, ...currentConfig };
    let newConfig = { ...baseConfig, ...config };
    newConfig = this.validValues(newConfig);

    const configNames = Object.keys(config);
    configNames.forEach(name => {
      const checkValue = config[name];
      const typeValue = typeof this.defaultConfig[name];

      if(typeValue === 'number') {
        const isValid = typeof checkValue === 'number' && !Number.isNaN(checkValue) && Number.isFinite(checkValue);

        newConfig[name] = isValid ? checkValue : baseConfig[name];
      } else if(typeValue === 'boolean') {
        const isValid = typeof checkValue === 'boolean';

        newConfig[name] = isValid ? config[name] : baseConfig[name];
      } else if(typeValue === 'string' && name === 'sliderType') {
        const { sliderType } = config;

        newConfig.isSingle = sliderType === 'single';
        newConfig.isRange = sliderType === 'range';
        newConfig.isProgress = sliderType === 'progress';
      } 
    });

    if(newConfig.minValue > newConfig.maxValue) {
      const min = newConfig.minValue;
      const max = newConfig.maxValue;

      newConfig.minValue = max;
      newConfig.maxValue = min;
    }

    if(newConfig.pointsForEach < 1) newConfig.pointsForEach = 1;

    newConfig.step = this.validStep(config);
    this.currentConfig = newConfig;
    this.init();
  }

  setListeners() {
    const { view } = this.controller;
    const isLabelOnClick =
      this.currentConfig.isLabel && this.currentConfig.isLabelOnClick;

    window.addEventListener('resize', view.handleWindowResize);

    view.range.lineDOM.addEventListener('click', view.range.handleRangeClick);

    view.button.forEach((btn) => {
      btn.DOM.addEventListener('mousedown', btn.handleButtonMousedown);
      btn.DOM.addEventListener('touchstart', btn.handleButtonTouchstart);
      btn.DOM.addEventListener('touchmove', btn.handleButtonTouchmove);
      btn.DOM.addEventListener('touchend', btn.handleButtonTouchend);
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
        view.button[i].DOM.addEventListener('touchstart', elem.handleButtonMousedown);
        document.addEventListener('mouseup', elem.handleButtonMouseup);
        document.addEventListener('touchend', elem.handleButtonMouseup);
      });
    }
  }

  removeListeners() {
    const { view } = this.controller;
    const isLabelOnClick =
      this.currentConfig.isLabel && this.currentConfig.isLabelOnClick;

    window.removeEventListener('resize', view.handleWindowResize);
    
    view.range.lineDOM.removeEventListener('click', view.range.handleRangeClick);

    view.button.forEach((btn) => {
      btn.DOM.removeEventListener('mousedown', btn.handleButtonMousedown);
      btn.DOM.removeEventListener('touchstart', btn.handleButtonTouchstart);
      btn.DOM.removeEventListener('touchmove', btn.handleButtonTouchmove);
      btn.DOM.removeEventListener('touchend', btn.handleButtonTouchend);
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
        view.button[i].DOM.removeEventListener('touchstart', elem.handleButtonMousedown);
        document.removeEventListener('mouseup', elem.handleButtonMouseup);
        document.removeEventListener('touchend', elem.handleButtonMouseup);
      });
    }
  }

  private validValues(config: any) {
    const baseConfig = { ...this.defaultConfig, ...this.currentConfig };
    const newConfig = { ...baseConfig, ...config };
    const { value1Slider, value2Slider, sliderValues } = config;

    if(sliderValues) {
      sliderValues.forEach((value: number, i: number) => {
        const isNumber = typeof value === 'number' && !Number.isNaN(value);
        newConfig.sliderValues[i] = isNumber ? value : baseConfig.sliderValues[i];
      });
    }

    if(value1Slider || value2Slider) {
      const values = [value1Slider, value2Slider];
      values.forEach((value: number, i: number) => {
        const isNumber = typeof value === 'number' && !Number.isNaN(value);
        newConfig.sliderValues[i] = isNumber ? value : baseConfig.sliderValues[i];
      });

      delete newConfig.value1Slider;
      delete newConfig.value2Slider;
    }

    return newConfig;
  }

  private validStep(config: any) {
    const baseConfig = { ...this.defaultConfig, ...this.currentConfig };
    const newConfig = { ...this.defaultConfig, ...this.currentConfig, ...config };
    const { minValue, maxValue, step } = newConfig;
    const interval = maxValue - minValue;
    const isStepFall = step === 0 || interval < step;
    const isIntegerStep = Number.isInteger(interval / step);

    if(step < 0) {
      newConfig.step = baseConfig.step;
    }  else if(isStepFall) {
      newConfig.step = interval;
    } else if(interval === 0) {
      newConfig.step = 0;
    } else if(!isIntegerStep) {
      const points = Math.ceil(interval / step);
      newConfig.step = interval / (points - 1);
    }

    return newConfig.step;
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