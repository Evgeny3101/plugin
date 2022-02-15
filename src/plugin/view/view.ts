import IConfig from '../interface/IConfig';
import IVarsPosition from '../interface/IVarsPosition';
import Range from './range/range';
import Button from './button/button';
import Interval from './interval/interval';
import Label from './label/label';
import Scale from './scale/scale';
import TextField from './text-field';

class View {
  range!: Range;
  button: Button[] = [];
  textField: TextField[] = [];
  label: Label[] = [];
  interval?: Interval;
  scale?: Scale;
  pos!: IVarsPosition;
  step!: number;
  rangeSize!: number;

  constructor(public elem: HTMLElement, public config: IConfig) {
    this.setPositionVariables();
    this.installComponents();
    this.setElementSizes(); // собираю размеры элементов после вставки в DOM
    this.setValues(this.config.sliderValues);
    this.convertValues(this.config.sliderValues);
    this.toPositionElements();
  }

  setValues(sliderValues: number[]) {
    this.config.sliderValues = sliderValues;

    let values: string[];
    // значение обрабатывается пользовательской функцией из конфига
    if (this.config.updateValues) values = this.config.updateValues(sliderValues);
    else values = sliderValues.map((name) => name.toString());

    if (!values) values = sliderValues.map((name) => name.toString());

    if (this.textField) {
      this.textField.forEach((element, i) => {
        element.setValue(values[i]);
      });
    }

    if (this.label) {
      this.label.forEach((element, i) => {
        element.setValue(values[i]);
      });
    }
  }

  convertValues(sliderValues: number[]) {
    const { minValue, isRange } = this.config;

    if (isRange) {
      sliderValues.forEach((num, i) => {
        const newCoord = this.step * (num - minValue);
        this.button[i].setCoord(newCoord);
      });
    } else {
      const newCoord = this.step * (sliderValues[0] - minValue);
      this.button[0].setCoord(newCoord);
    }
  }

  convertCoords(buttonsCoords: number[]): number[] {
    const { minValue } = this.config;
    const { step } = this;

    const newValues: number[] = buttonsCoords.map(
      (buttonCoords) => buttonCoords / step + minValue
    );

    return newValues;
  }

  defineButtonIndexByCoord(coord: number): number {
    const { isRange } = this.config;
    const buttonsCoords = this.button.map((btn) => btn.coord);
    let indexOfRequiredButton = 0;

    if (isRange) {
      const btn1 = buttonsCoords[0];
      const btn2 = buttonsCoords[1];
      const range = btn2 - btn1;
      const btn1Diapason = range / 2 + btn1;

      indexOfRequiredButton = coord > btn1Diapason ? 1 : 0;
    }
    
    return indexOfRequiredButton;
  }

  toPositionElements() {
    const { isLabel } = this.config;
    const buttonsCoords = this.button.map((elem) => elem.coord);
    const buttonsSizes = this.button.map((elem) => elem.DOM[this.pos.offsetSize]);
    this.button.forEach((elem) => elem.toPosition());

    // sets coords for interval
    if (this.interval) {
      this.interval.setCoords(buttonsCoords);
      this.interval.toPosition();
    }

    // sets coords for label
    if (isLabel) {
      this.label.forEach((element, i) => {
        element.setCoord(buttonsCoords[i] + (buttonsSizes[i] / 2));
        element.toPosition();
      });
    }
  }

  handleWindowResize = () => {
    this.setElementSizes();
    this.setValues(this.config.sliderValues);
    this.convertValues(this.config.sliderValues);
    this.toPositionElements();
  };

  setListeners() {
    const isLabelOnClick =
      this.config.isLabel && this.config.isLabelOnClick;

    window.addEventListener('resize', this.handleWindowResize);

    this.range.lineDOM.addEventListener('click', this.range.handleRangeClick);

    this.button.forEach((btn) => {
      btn.DOM.addEventListener('mousedown', btn.handleButtonMousedown);
      btn.DOM.addEventListener('touchstart', btn.handleButtonTouchstart, {passive: true});
      btn.DOM.addEventListener('touchmove', btn.handleButtonTouchmove, {passive: true});
      btn.DOM.addEventListener('touchend', btn.handleButtonTouchend);
    });

    this.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.addEventListener('blur', elem.handleTextFieldBlur);
      }
    });

    if (this.scale) {
      this.scale.points.forEach((elem) => {
        elem.DOM.addEventListener('click', elem.handlePointClick);
      });
    }

    if (isLabelOnClick) {
      this.label.forEach((elem, i) => {
        elem.handleButtonMouseup();
        this.button[i].DOM.addEventListener('mousedown', elem.handleButtonMousedown);
        this.button[i].DOM.addEventListener('touchstart', elem.handleButtonMousedown, {passive: true});
        document.addEventListener('mouseup', elem.handleButtonMouseup);
        document.addEventListener('touchend', elem.handleButtonMouseup);
      });
    }
  }

  removeListeners() {
    const isLabelOnClick =
      this.config.isLabel && this.config.isLabelOnClick;

    window.removeEventListener('resize', this.handleWindowResize);
    
    this.range.lineDOM.removeEventListener('click', this.range.handleRangeClick);

    this.button.forEach((btn) => {
      btn.DOM.removeEventListener('mousedown', btn.handleButtonMousedown);
      btn.DOM.removeEventListener('touchstart', btn.handleButtonTouchstart);
      btn.DOM.removeEventListener('touchmove', btn.handleButtonTouchmove);
      btn.DOM.removeEventListener('touchend', btn.handleButtonTouchend);
    });

    this.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.removeEventListener('blur', elem.handleTextFieldBlur);
      }
    });

    if (this.scale) {
      this.scale.points.forEach((elem) => {
        elem.DOM.removeEventListener('click', elem.handlePointClick);
      });
    }

    if (isLabelOnClick) {
      this.label.forEach((elem, i) => {
        elem.handleButtonMousedown();
        this.button[i].DOM.removeEventListener('mousedown', elem.handleButtonMousedown);
        this.button[i].DOM.removeEventListener('touchstart', elem.handleButtonMousedown);
        document.removeEventListener('mouseup', elem.handleButtonMouseup);
        document.removeEventListener('touchend', elem.handleButtonMouseup);
      });
    }
  }

  // устанавливает переменные для вертикального или горизонтального позиционирования
  private setPositionVariables() {
    const { isVertical, isInvert } = this.config;

    if (isVertical) {
      this.pos = {
        size: 'height',
        offset: isInvert ? 'bottom' : 'top',
        clientSize: 'clientHeight',
        offsetSize: 'offsetHeight',
        page: 'pageY',
        offsetCoord: 'offsetY',
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        size: 'width',
        offset: isInvert ? 'right' : 'left',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        page: 'pageX',
        offsetCoord: 'offsetX',
        offsetFrom: 'offsetLeft',
      };
    }
  }

  // создание классов компонентов и DOM элементов
  private installComponents() {
    const {
      isRange,
      isProgress,
      isInvert,
      isVertical,
      isLabel,
      isLabelOnClick,
      isScale,
      textField,
    } = this.config;
    const {pos} = this;
    const isInterval = isRange || isProgress;

    this.range = new Range(pos, isInvert);
    this.range.setClassPosition(isVertical);
    const rangeDOM = this.range.DOM;

    // создание кнопок
    this.button = [];

    const buttonArrayLength = isRange ? 2 : 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(pos, isInvert);
      rangeDOM.appendChild(this.button[i].DOM);
    }

    // создание интервала между кнопок
    if (isInterval) {
      this.interval = new Interval(pos, isProgress);
      rangeDOM.appendChild(this.interval.DOM);
    }

    // создание надписей над кнопками
    if (isLabel) {
      this.label = [];
      this.button.forEach((_element, i) => {
        this.label[i] = new Label(isLabelOnClick, pos.offset);
        rangeDOM.appendChild(this.label[i].DOM);
      });
    }

    // создание шкалы
    if (isScale) {
      this.scale = new Scale(this.config);
      rangeDOM.appendChild(this.scale.DOM);
    }

    // создает класс textField и ищет поле
    if (textField) {
      textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
      });
    }

    // добавляет слайдер на страницу
    this.elem.appendChild(rangeDOM);
  }

  // задает параметры элементов
  private setElementSizes() {
    const { minValue, maxValue } = this.config;
    const { pos } = this;
    const valueRange = Math.abs(maxValue - minValue);
    const buttonSize = this.button[0].DOM[pos.offsetSize];
    
    this.rangeSize = this.range.DOM[pos.clientSize] - buttonSize;
    this.step = this.rangeSize / valueRange;

    this.range.setOptions(buttonSize);

    if (this.interval) {
      this.interval.setButtonSize(buttonSize);
    }

    if (this.scale) {
      this.scale.setScale(this.rangeSize);
    }
  }
} // class View

export default View;
