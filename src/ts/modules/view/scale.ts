import Observable from '../../util/observable';
import Point from './point';
import ElemDOM from '../../util/elemDOM';
import roundToMultiple from '../../util/mixins';
import Config from '../interface/config';
import Button from './button';

class Scale extends ElemDOM {
  Observable = new Observable();
  points: Point[] = [];
  numbers: ElemDOM[] = [];
  long: ElemDOM[] = [];
  short: ElemDOM[] = [];
  coord!: number;
  pos: { [key: string]: string };
  isInvert: boolean;

  constructor(data: {
    id: Element;
    size: number;
    pos: { [key: string]: string };
    config: Config;
  }) {
    super(data.id, 'div', 'js-scale-range');
    const { config } = data;
    this.pos = data.pos;
    this.isInvert = config.invert;

    this.setPoints({
      points: config.points,
      numberForEach: config.numberForEach,
      longForEach: config.longForEach,
    });

    this.setValue(config);

    this.determineСoordScale(data.size);
  }

  // установка точек шкалы
  setPoints(data: { points: number; numberForEach: number; longForEach: number }) {
    for (let i = 0; i < data.points; i += 1) {
      this.points[i] = new Point(this.DOM);
      const point = this.points[i];

      if (i % data.numberForEach === 0) {
        point.textField = new ElemDOM(point.DOM, 'div', 'js-scale-line__number');
      }

      if (i % data.longForEach === 0) {
        point.line = new ElemDOM(point.DOM, 'div', 'js-scale-line__long');
      } else {
        point.line = new ElemDOM(point.DOM, 'div', 'js-scale-line__short');
      }
    }
  }

  setValue(data: { minValue: number; maxValue: number; step: number; invert: boolean }) {
    const rangeValues = Math.abs(data.minValue) + data.maxValue;
    const step = rangeValues / (this.points.length - 1);

    let currentValue: number;
    this.isInvert = data.invert;

    currentValue = this.isInvert ? data.maxValue : data.minValue;

    this.points.forEach((elem) => {
      const point: Point = elem;
      point.value = roundToMultiple(currentValue, data.step);

      if (point.textField) {
        point.textField.DOM.innerText = String(point.value);
      }

      currentValue = this.isInvert ? (currentValue -= step) : (currentValue += step);
    });
  }

  // определение координат полос шкалы
  determineСoordScale(rangeSize: number) {
    const step = rangeSize / (this.points.length - 1);
    let coord = 0;

    this.points.forEach((elem) => {
      const point: Point = elem;
      point.coord = coord;
      coord += step;
    });
  }

  // обработчик нажатия на полосу шкалы
  pressScaleBar(buttonArr: Button[], isRange: boolean, id: number) {
    const scale = this.points[id].coord;
    let btnId;
    if (!isRange) {
      buttonArr[0].toPosition(scale);
      btnId = 0;
    } else {
      const btn1 = buttonArr[0].coord;
      const btn2 = buttonArr[1].coord;
      const range = Math.abs(btn2) - Math.abs(btn1);
      const diaposon = range / 2 + Math.abs(btn1);
      if (scale > diaposon) btnId = 1;
      else btnId = 0;
    }

    this.Observable.notify({
      value: this.points[id].value,
      id: btnId,
    });
  }
} // class

export default Scale;
