import { roundToMultiple, createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';
import IConfig from '../../interface/IConfig';
import Point from '../point/point';
import Button from '../button/button';

class Scale {
  Observable = new Observable();
  points: Point[] = [];
  DOM: HTMLElement;

  constructor(parent: HTMLElement, public defaultConfig: IConfig) {
    this.DOM = createHTML('<div class="js-scale-range"></div>', parent);
    this.createPoints();
  } // constructor end

  // create scale points
  createPoints() {
    const { points, numberForEach, longForEach } = this.defaultConfig;

    for (let i = 0; i < points; i += 1) {
      const isNumber = i % numberForEach === 0;
      const isLong = i % longForEach === 0;

      this.points[i] = new Point(this.DOM, isNumber, isLong);
    }
  }

  // sets scale according to parameters
  setScale(size: number) {
    this.setValue();
    this.determineСoordScale(size);
  }

  // sets scale values
  setValue() {
    const { minValue, maxValue, step, isInvert } = this.defaultConfig;

    const rangeValues = Math.abs(minValue) + maxValue;
    const stepBetween = rangeValues / (this.points.length - 1);

    let currentValue: number;
    currentValue = isInvert ? maxValue : minValue;

    this.points.forEach((elem) => {
      const point: Point = elem;
      point.value = roundToMultiple(currentValue, step);

      if (point.numberDOM) {
        point.numberDOM.innerText = String(point.value);
      }

      currentValue = isInvert ? currentValue - stepBetween : currentValue + stepBetween;
    });
  }

  // determination coordinates of the points on scale
  determineСoordScale(rangeSize: number) {
    const { isInvert } = this.defaultConfig;

    const step = rangeSize / (this.points.length - 1);
    let coord = isInvert ? rangeSize : 0;

    this.points.forEach((elem) => {
      const point = elem;
      point.coord = coord;
      coord = isInvert ? (coord -= step) : (coord += step);
    });
  }

  // click handler on the points
  handleScalePointClick(buttons: Button[], index: number) {
    const { isRange } = this.defaultConfig;
    const point = this.points[index].coord;

    let btnIndex;
    if (!isRange) {
      btnIndex = 0;
    } else {
      // initial number of buttons is undefined
      // get the current coordinates of the buttons
      const btn1 = buttons[0].coord;
      const btn2 = buttons[1].coord;

      const range = btn2 - btn1;
      const btn1Diapason = range / 2 + btn1;

      btnIndex = point > btn1Diapason ? 1 : 0;
    }

    this.Observable.notify({
      value: this.points[index].value,
      index: btnIndex,
    });
  }
} // class

export default Scale;
