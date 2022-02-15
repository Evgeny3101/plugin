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
    const { view } = this.controller;
    const isLabelOnClick =
      this.currentConfig.isLabel && this.currentConfig.isLabelOnClick;

    window.addEventListener('resize', view.handleWindowResize);

    view.range.lineDOM.addEventListener('click', view.range.handleRangeClick);

    view.button.forEach((btn) => {
      btn.DOM.addEventListener('mousedown', btn.handleButtonMousedown);
      btn.DOM.addEventListener('touchstart', btn.handleButtonTouchstart, {passive: true});
      btn.DOM.addEventListener('touchmove', btn.handleButtonTouchmove, {passive: true});
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
        view.button[i].DOM.addEventListener('touchstart', elem.handleButtonMousedown, {passive: true});
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

  private findDOM(id: string | HTMLElement) {
    let elem;
    if (typeof id === 'string') elem = <HTMLElement>document.querySelector(id);
    else elem = id;
    if (!elem) throw new Error('Main DOM element not found.');

    this.elem = elem;
  }
} // class

export default RangeSlider;
