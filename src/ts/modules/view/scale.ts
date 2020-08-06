import Observable from '../../util/observable';
import ElemDOM from '../../util/elemDOM';
import roundToMultiple from '../../util/mixins';
import IConfig from '../interface/config';
import IPositionVars from '../interface/IVarsPosition';
import Button from './button';
import Point from './point';

class Scale extends ElemDOM {
  Observable = new Observable();
  points: Point[] = [];
  numbers: ElemDOM[] = [];
  long: ElemDOM[] = [];
  short: ElemDOM[] = [];
  coord!: number;
  pos: IPositionVars;
  isInvert: boolean;

  constructor(data: {
    parent: Element;
    size: number;
    pos: IPositionVars;
    config: IConfig;
  }) {
    super(data.parent, 'div', 'js-scale-range');

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
    // getCoordScale
    const step = rangeSize / (this.points.length - 1);
    let coord = 0;

    this.points.forEach((elem) => {
      const point: Point = elem;
      point.coord = coord;
      coord += step;
    });
  }

  // обработчик нажатия на полосу шкалы
  pressScaleBar(buttonArr: Button[], isRange: boolean, isInvert: boolean, id: number) {
    // вместо кнопок их координаты
    const scale = this.points[id].coord;
    let btnId;
    if (!isRange) {
      buttonArr[0].toPosition(scale); // переделать
      btnId = 0;
    } else {
      const btn1 = buttonArr[0].coord;
      const btn2 = buttonArr[1].coord;
      const range = Math.abs(btn2) - Math.abs(btn1);
      const diapason = range / 2 + Math.abs(btn1);

      if (scale > diapason) btnId = isInvert ? 0 : 1;
      else btnId = isInvert ? 1 : 0;
    }

    this.Observable.notify({
      value: this.points[id].value,
      id: btnId,
    });
  }
} // class

export default Scale;
