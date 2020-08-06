import IConfig from './interface/config';
import IPositionVars from './interface/IVarsPosition';
import Range from './view/range';
import Button from './view/button';
import Interval from './view/interval';
import Label from './view/label';
import Scale from './view/scale';
import TextField from './view/textField';

class View {
  range: Range;
  button: Button[] = [];
  label: Label[] = [];
  textField: TextField[] = [];
  pos!: IPositionVars;
  interval: Interval | undefined;
  scale: Scale | undefined;
  isInvert!: boolean;
  rangeSize!: number;
  step!: number;

  constructor(parent: Element, config: IConfig) {
    this.range = new Range(parent, config.vertical);
    this.init(config);
  }

  init(config: IConfig) {
    // установка переменных для вертикального или горизонтального позиционирования
    this.setPositionVariables(config.vertical, config.invert);

    // удалит установленые элементы
    this.range.DOM.innerHTML = '';

    // установка  кнопок
    this.button = [];
    const buttonArrayLength = Number(config.range) + 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.range.DOM, this.pos, i);
    }

    // установка  интервала  между кнопками
    if (config.range) {
      const buttonSize = this.button[0].DOM[this.pos.offsetSize];
      this.interval = new Interval(this.range.DOM, this.pos, buttonSize);
    }

    // установка лейблов над кнопками
    if (config.label) {
      this.label = [];
      this.button.forEach((element, i) => {
        this.label[i] = new Label(this.range.DOM, config.labelOnClick);
        this.label[i].input.value = String(config.value[i]);
      });
    }

    // установка текстовых полей
    if (config.textField) {
      config.textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
        this.textField[i].updateTextField(config.value);
      });
    }

    // установит значения this.rangeSize и this.step
    this.updateRangeSize({
      maxValue: config.maxValue,
      minValue: config.minValue,
    });

    // установка  шкалы
    if (config.scale) {
      this.scale = new Scale({
        parent: this.range.DOM,
        size: this.rangeSize,
        pos: this.pos,
        config,
      });
    }

    // обновление координат и установка элементов
    this.updateCoords({
      range: config.range,
      label: config.label,
      minValue: config.minValue,
      value: config.value,
    });

    // установка слушателей
    this.setListeners(config);
  }

  // установка переменных для вертикального или горизонтального позиционирования
  setPositionVariables(isVertical: boolean, isInvert: boolean) {
    if (isVertical) {
      this.pos = {
        isVertical,
        isInvert,
        size: 'height',
        offset: isInvert ? 'bottom' : 'top',
        clientSize: 'clientHeight',
        offsetSize: 'offsetHeight',
        page: 'pageY',
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        isVertical,
        isInvert,
        size: 'width',
        offset: isInvert ? 'right' : 'left',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        page: 'pageX',
        offsetFrom: 'offsetLeft',
      };
    }
  }

  // установка слушателей
  setListeners(config: IConfig) {
    // автоматическое обновление при изменении ширины экрана
    window.addEventListener('resize', this.updateSize.bind(this, config));

    // перемещение бегунка
    this.button.forEach((btn) =>
      btn.DOM.addEventListener('mousedown', btn.move.bind(btn))
    );

    // при вводе значений в text-field
    this.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.addEventListener('blur', elem.toInputValues.bind(elem));
      }
    });

    // клик на деление шкалы
    if (this.scale) {
      this.scale.points.forEach((element, i) => {
        element.DOM.addEventListener(
          'click',
          this.scale.pressScaleBar.bind(
            this.scale,
            this.button,
            config.range,
            config.invert,
            i
          )
        );
      });
    }

    // показывать / скрывать лейбл при нажатии
    if (config.label && config.labelOnClick) {
      this.label.forEach((elem, i) => {
        elem.DOM.classList.add('js-label__hide');
        this.button[i].DOM.addEventListener('mousedown', elem.show.bind(elem));
        document.addEventListener('mouseup', elem.hide.bind(elem));
      });
    }
  }

  updateSize(config: IConfig) {
    this.updateRangeSize({
      maxValue: config.maxValue,
      minValue: config.minValue,
    });

    this.updateCoords({
      range: config.range,
      label: config.label,
      minValue: config.minValue,
      value: config.value,
    });
  }

  // установит значения this.rangeSize и this.step
  updateRangeSize(data: { minValue: number; maxValue: number }) {
    const btn = this.button[0];

    this.rangeSize = this.range.DOM[this.pos.clientSize] - btn.DOM[this.pos.offsetSize];
    const valueRange = Math.abs(data.maxValue - data.minValue);

    this.step = this.rangeSize / valueRange;
  }

  // обновление координат и установка элементов
  updateCoords(data: {
    range: boolean;
    label: boolean;
    minValue: number;
    value: number[];
  }) {
    if (data.range === true) {
      data.value.forEach((value, i) => {
        const newCoord = this.step * (value + Math.abs(data.minValue));
        this.button[i].toPosition(newCoord);
      });

      // установка интервала по координатам
      this.interval.toPosition([this.button[0].coord, this.button[1].coord]);
    } else {
      const newCoord = this.step * (data.value[0] + Math.abs(data.minValue));
      this.button[0].toPosition(newCoord);
    }

    // для установка Label по координатам
    if (data.label) {
      this.label.forEach((element, i) => {
        let coord: number;

        if (this.isInvert)
          coord = this.button[i].coord + this.button[i].DOM[this.pos.offsetSize];
        else coord = this.button[i].coord;

        element.toPosition(coord, this.pos.offset);
        element.setValue(data.value[i]);
      });
    }
  }
} // class View

export default View;
