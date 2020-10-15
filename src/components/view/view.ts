import IConfig from '../interface/IConfig';
import IPositionVars from '../interface/IVarsPosition';
import Range from './range/range';
import Button from './button/button';
import Interval from './interval/interval';
import Label from './label/label';
import Scale from './scale/scale';
import TextField from './textField';

class View {
  range!: Range;
  button: Button[] = [];
  textField: TextField[] = [];
  label: Label[] = [];
  interval?: Interval;
  scale?: Scale;

  pos!: IPositionVars;
  step!: number;
  rangeSize!: number;
  handleWindowResize!: EventListener;

  constructor(public parent: Element, public defaultConfig: IConfig) {
    this.setPositionVariables();
    this.installComponents();
    this.setElementsParameters();
    this.setValues();
    this.convertValues();
    this.setCoords();
    this.toPositionElements();
    this.setListeners();
  }

  setValues(sliderValues: number[] = this.defaultConfig.sliderValues) {
    this.defaultConfig.sliderValues = sliderValues;

    if (this.textField) {
      this.textField.forEach((element, i) => {
        element.setValue(sliderValues[i]);
      });
    }

    if (this.label) {
      this.label.forEach((element, i) => {
        element.setValue(sliderValues[i]);
      });
    }
  }

  convertValues(sliderValues: number[] = this.defaultConfig.sliderValues) {
    const { minValue, isRange } = this.defaultConfig;

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

  setCoords() {
    const { isLabel, isInvert } = this.defaultConfig;
    const buttonsCoords = this.button.map((elem) => elem.coord);
    const buttonsSizes = this.button.map((elem) => elem.DOM[this.pos.offsetSize]);

    // sets coords for interval
    if (this.interval) this.interval.setCoords(buttonsCoords);

    // sets coords for label
    if (isLabel) {
      this.label.forEach((element, i) => {
        let coords: number;

        if (isInvert) {
          coords = buttonsCoords[i] + buttonsSizes[i];
        } else coords = buttonsCoords[i];

        element.setCoord(coords);
      });
    }
  }

  toPositionElements() {
    this.button.forEach((elem) => elem.toPosition());

    if (this.interval) {
      this.interval.toPosition();
    }

    if (this.label) {
      this.label.forEach((elem) => elem.toPosition());
    }
  }

  setListeners() {
    const { isLabel, isLabelOnClick } = this.defaultConfig;

    this.handleWindowResize = this.resizeSlider.bind(this);
    window.addEventListener('resize', this.handleWindowResize);

    this.button.forEach((btn) => {
      btn.DOM.addEventListener('mousedown', btn.handleButtonMousedown);
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

    if (isLabel && isLabelOnClick) {
      this.label.forEach((elem, i) => {
        elem.hide();
        this.button[i].DOM.addEventListener('mousedown', elem.handleButtonMousedown);
        document.addEventListener('mouseup', elem.handleButtonMouseup);
      });
    }
  }

  removeListeners() {
    const { isLabel, isLabelOnClick } = this.defaultConfig;

    window.removeEventListener('resize', this.handleWindowResize);

    this.button.forEach((btn) => {
      btn.DOM.removeEventListener('mousedown', btn.handleButtonMousedown);
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

    if (isLabel && isLabelOnClick) {
      this.label.forEach((elem, i) => {
        elem.show();
        this.button[i].DOM.removeEventListener('mousedown', elem.handleButtonMousedown);
        document.removeEventListener('mouseup', elem.handleButtonMouseup);
      });
    }
  }

  // устанавливает переменные для вертикального или горизонтального позиционирования
  private setPositionVariables() {
    const { isVertical, isInvert } = this.defaultConfig;

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
    } = this.defaultConfig;

    this.range = new Range();
    this.range.setClassPosition(isVertical);

    // создание кнопок
    this.button = [];

    const buttonArrayLength = isRange ? 2 : 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.range.DOM, this.pos, i, isInvert);
    }

    // создание интервала между кнопок
    if (isRange || isProgress) {
      this.interval = new Interval(this.range.DOM, this.pos, isProgress);
    }

    // создание надписей над кнопками
    if (isLabel) {
      this.label = [];
      this.button.forEach((element, i) => {
        this.label[i] = new Label(this.range.DOM, isLabelOnClick, this.pos.offset);
      });
    }

    // создание шкалы
    if (isScale) {
      this.scale = new Scale(this.range.DOM, this.defaultConfig);
    }

    // создает класс textField и ищет поле
    if (textField) {
      textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
      });
    }

    // добавляет слайдер на страницу
    this.parent.append(this.range.DOM);
  }

  // устанавливает значения для this.rangeSize и this.step будет использоваться методом 'setValues'
  // будет использоваться в методах setElementsParameters и handleWindowResize
  private updateRangeSize() {
    const { minValue, maxValue } = this.defaultConfig;

    const buttonSize = this.button[0].DOM[this.pos.offsetSize];
    const rangeSize = this.range.DOM[this.pos.clientSize];

    this.rangeSize = rangeSize - buttonSize;

    const valueRange = Math.abs(maxValue - minValue);
    this.step = this.rangeSize / valueRange;
  }

  // задает параметры элементов
  // необходим this.rangeSize (для метода Scale.setScale)
  private setElementsParameters() {
    this.updateRangeSize();

    if (this.interval) {
      const buttonSize = this.button[0].DOM[this.pos.offsetSize];
      this.interval.setButtonValue(buttonSize);
    }

    if (this.scale) {
      this.scale.setScale(this.rangeSize);
    }
  }

  // обновляет размер диапазона и устанавливаем элементы в позицию
  private resizeSlider() {
    this.updateRangeSize();
    this.setValues();
    this.convertValues();
    this.setCoords();
    this.toPositionElements();
  }
} // class View

export default View;
