import Observable from '../../util/observable';
import ElemDOM from '../../util/elemDOM';
import roundToMultiple from '../../util/mixins';
import IConfig from '../interface/IConfig';
import Point from './point';

class Scale extends ElemDOM {
  Observable = new Observable();
  points: Point[] = [];
  isInvert!: boolean;
  isRange!: boolean;

  constructor(parent: Element, config: IConfig) {
    super('div', 'js-scale-range', parent);

    this.setPoints({
      points: config.points,
      numberForEach: config.numberForEach,
      longForEach: config.longForEach,
    });
  } // constructor end

  setScale(size: number, config: IConfig) {
    this.isInvert = config.isInvert;
    this.isRange = config.isRange;

    this.setValue(config.minValue, config.maxValue, config.step);
    this.determineСoordScale(size);
  }

  // sets scale points
  setPoints(data: { points: number; numberForEach: number; longForEach: number }) {
    for (let i = 0; i < data.points; i += 1) {
      this.points[i] = new Point(this.DOM);
      const point = this.points[i];

      if (i % data.numberForEach === 0) {
        point.textField = new ElemDOM('div', 'js-scale-line__number', point.DOM);
      }

      if (i % data.longForEach === 0) {
        point.line = new ElemDOM('div', 'js-scale-line__long', point.DOM);
      } else {
        point.line = new ElemDOM('div', 'js-scale-line__short', point.DOM);
      }
    }
  }

  // sets scale values
  setValue(minValue: number, maxValue: number, sliderStep: number) {
    const rangeValues = Math.abs(minValue) + maxValue;
    const step = rangeValues / (this.points.length - 1);

    let currentValue: number;
    currentValue = this.isInvert ? maxValue : minValue;

    this.points.forEach((elem) => {
      const point: Point = elem;
      point.value = roundToMultiple(currentValue, sliderStep);

      if (point.textField) {
        point.textField.DOM.innerText = String(point.value);
      }

      currentValue = this.isInvert ? (currentValue -= step) : (currentValue += step);
    });
  }

  // determination coordinates of the points on scale
  determineСoordScale(rangeSize: number) {
    const step = rangeSize / this.points.length;
    let coord = this.isInvert ? rangeSize : 0;

    this.points.forEach((elem) => {
      const point: Point = elem;
      point.coord = coord;
      coord = this.isInvert ? (coord -= step) : (coord += step);
    });
  }

  // click handler on the points
  pressScaleBar(buttonsCoords: number[], index: number) {
    const point = this.points[index].coord;

    let btnIndex;
    if (!this.isRange) {
      btnIndex = 0;
    } else {
      const btn1 = buttonsCoords[0];
      const btn2 = buttonsCoords[1];

      const range = btn2 - btn1;
      const diapason = range / 2 + btn1;

      btnIndex = point > diapason ? 1 : 0;
    }

    this.Observable.notify({
      value: this.points[index].value,
      index: btnIndex,
    });
  }
} // class

export default Scale;
