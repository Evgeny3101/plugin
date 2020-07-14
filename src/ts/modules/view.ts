import Observable from '../util/observable';
import Range from './view/range';
import Button from './view/button';
import Interval from './view/interval';
import Label from './view/label';
import Scale from './view/scale';
import TextField from './view/textField';
import Config from './interface/config';

class View {
  Observable = new Observable();
  mainDOM: Element;
  range: Range;
  button: Button[] = [];
  label: Label[] = [];
  rangeSize!: number;
  step!: number;
  textField: TextField[] = [];
  pos: { [key: string]: string } = {};
  interval: Interval | undefined;
  scale: Scale | undefined;

  constructor(id: Element, config: Config) {
    this.mainDOM = id;
    this.range = new Range(this.mainDOM);
    this.init(config);
    // установка слушателей
    this.setListeners(config);
  }

  init(config: Config) {
    // удалит установленые элементы
    this.range.DOM.innerHTML = '';

    // установка переменных для вертикального или горизонтального позиционирования
    this.setPositionVariables(config.vertical);

    // установка  кнопок
    this.button = [];
    for (let i = 0; i <= Number(config.range); i++) {
      this.button[i] = new Button(this.range.DOM, this.pos);
    }

    // установка  интервала  между кнопками
    if (config.range) {
      this.interval = new Interval(this.range.DOM, this.pos);
    }

    // установка  лейблов над кнопками
    if (config.label) {
      this.label = [];
      for (let i = 0; i < this.button.length; i++) {
        this.label[i] = new Label(this.range.DOM, config.lableOnClick, config.invert);
        this.label[i].input.value = String(config.value[i]);
      }
    }

    // установка текстовых полей
    if (config.textField) {
      for (let i = 0; i < config.textField.length; i++) {
        this.textField[i] = new TextField(config.textField[i], config.invert);
        this.textField[i].updateTextField({
          value: config.value,
          id: i,
        });
      }
    }

    // установит значения this.rangeSize и this.step
    this.updateRangeSize({
      maxValue: config.maxValue,
      minValue: config.minValue,
    });

    // установка  шкалы
    if (config.scale) {
      this.scale = new Scale(this.range.DOM, this.pos, config);
      this.scale.determineСoordScale(this.rangeSize);
      this.scale.setValue(config);
      this.scale.determineСoordScale(this.rangeSize);
    }

    // обновление координат и установка элементов
    this.updateCoords({
      range: config.range,
      label: config.label,
      minValue: config.minValue,
      value: config.value,
    });
  }

  // установка переменных для вертикального или горизонтального позиционирования
  setPositionVariables(vertical: boolean) {
    if (vertical) {
      this.pos = {
        // range
        offset: 'top',
        size: 'height',
        clientSize: 'clientHeight',
        offsetSize: 'offsetHeight',
        // btn
        page: 'pageY',
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        // range
        offset: 'left',
        size: 'width',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        // btn
        page: 'pageX',
        offsetFrom: 'offsetLeft',
      };
    }

    this.range.setClassPositon(vertical);
  }

  // установка слушателей
  setListeners(config: Config) {
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
      for (let i = 0; i < this.scale.points.length; i++) {
        this.scale.points[i].DOM.addEventListener(
          'click',
          this.scale.pressScaleBar.bind(this.scale, this.button, config.range, i)
        );
      }
    }

    // показывать / скрывать лейбл при нажатии
    if (this.label.lableOnClick) {
      for (let i = 0; i < this.label.length; i++) {
        const elem = this.label[i];
        this.button[i].DOM.addEventListener('mousedown', elem.show.bind(elem));
        document.addEventListener('mouseup', elem.hide.bind(elem));
      }
    }
  }

  updateSize(config: Config) {
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
      for (let i = 0; i < data.value.length; i++) {
        const newCoord = this.step * (data.value[i] + Math.abs(data.minValue));

        this.button[i].toPosition(newCoord);
      }
      // установка интервала по координатам
      this.interval.toPosition([this.button[0], this.button[1]]);
    } else {
      const newCoord = this.step * (data.value[0] + Math.abs(data.minValue));
      this.button[0].toPosition(newCoord);
    }

    // для установка Label по координатам
    if (data.label) {
      for (let i = 0; i < this.label.length; i++) {
        this.label[i].toPosition(this.button[i].coord, this.pos.offset);
        this.label[i].setValue(data.value[i]);
      }
    }
  }
} // class View

export default View;
