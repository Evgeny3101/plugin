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

  constructor(public mainDOM: HTMLElement, public config: IConfig) {
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
        const newCoord = this.step * (num + Math.abs(minValue));
        this.button[i].setCoord(newCoord);
      });
    } else {
      const newCoord = this.step * (sliderValues[0] + Math.abs(minValue));
      this.button[0].setCoord(newCoord);
    }
  }

  toPositionElements() {
    const { isLabel, isInvert } = this.config;
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
        if (isInvert) {
          element.setCoord(buttonsCoords[i] + buttonsSizes[i]);
        } else element.setCoord(buttonsCoords[i]);
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
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        size: 'width',
        offset: isInvert ? 'right' : 'left',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        page: 'pageX',
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
    const isInterval = isRange || isProgress;

    this.range = new Range();
    this.range.setClassPosition(isVertical);
    const rangeDOM = this.range.DOM;

    // создание кнопок
    this.button = [];

    const buttonArrayLength = isRange ? 2 : 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.pos, isInvert);
      rangeDOM.appendChild(this.button[i].DOM);
    }

    // создание интервала между кнопок
    if (isInterval) {
      this.interval = new Interval(this.pos, isProgress);
      rangeDOM.appendChild(this.interval.DOM);
    }

    // создание надписей над кнопками
    if (isLabel) {
      this.label = [];
      this.button.forEach((_element, i) => {
        this.label[i] = new Label(isLabelOnClick, this.pos.offset);
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
    this.mainDOM.appendChild(this.range.DOM);
  }

  // задает параметры элементов
  private setElementSizes() {
    const { minValue, maxValue } = this.config;
    const valueRange = Math.abs(maxValue - minValue);
    const buttonSize = this.button[0].DOM[this.pos.offsetSize];
    this.rangeSize = this.range.DOM[this.pos.clientSize] - buttonSize;
    this.step = this.rangeSize / valueRange;

    if (this.interval) {
      this.interval.setButtonSize(buttonSize);
    }

    if (this.scale) {
      this.scale.setScale(this.rangeSize);
    }
  }
} // class View

export default View;
