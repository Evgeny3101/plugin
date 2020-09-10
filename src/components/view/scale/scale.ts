import { roundToMultiple, createHTML } from '../../../ts/mixins';
import IConfig from '../../interface/IConfig';
import Point from '../point/point';

class Scale {
  points: Point[] = [];
  DOM: HTMLElement;

  constructor(parent: HTMLElement, public defaultConfig: IConfig) {
    this.DOM = createHTML('<div class="js-scale-range"></div>', parent);
    this.createPoints();
  } // constructor end

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

  // create scale points
  private createPoints() {
    const { points, numberForEach, longForEach } = this.defaultConfig;

    for (let i = 0; i < points; i += 1) {
      const isNumber = i % numberForEach === 0;
      const isLong = i % longForEach === 0;

      this.points[i] = new Point(this.DOM, isNumber, isLong);
    }
  }

  // determination coordinates of the points on scale
  private determineСoordScale(rangeSize: number) {
    const { isInvert } = this.defaultConfig;

    const step = rangeSize / (this.points.length - 1);
    let coord = isInvert ? rangeSize : 0;

    this.points.forEach((elem) => {
      const point = elem;
      point.coord = coord;
      coord = isInvert ? (coord -= step) : (coord += step);
    });
  }
} // class

export default Scale;
