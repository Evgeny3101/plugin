import { roundToMultiple, createHTML } from '../../utils/mixins';
import IConfig from '../../interface/IConfig';
import Point from '../point/point';

class Scale {
  points: Point[] = [];
  DOM: HTMLElement;

  constructor(public config: IConfig) {
    this.DOM = createHTML('<div class="rs-scale-range"></div>');
    this.createPoints();
  } // constructor

  // устанавливает шкалу согласно параметрам
  setScale(rangeSize: number) {
    this.setValue();
    this.determineСoordScale(rangeSize);
  }

  // устанавливает значения шкалы
  setValue() {
    const { minValue, maxValue, step, isInvert } = this.config;
    const { points } = this;

    if(step === 0) points.forEach((point) => point.setValue(minValue));
    else {
      const rangeValues: number = maxValue - minValue;
      const stepBetween: number = rangeValues / (points.length - 1);
      let currentValue: number = isInvert ? maxValue : minValue;

      points.forEach((elem) => {
        const point: Point = elem;
        const newValue = roundToMultiple(currentValue, step, minValue, maxValue);

        if(isInvert) {
          currentValue -= stepBetween;
        } else currentValue += stepBetween;

        point.setValue(newValue);
      });
    }
  }

  // создать точки шкалы
  private createPoints() {
    const { pointsForEach, numberForEach, longForEach, maxValue, minValue, step  } = this.config;
    const interval: number = maxValue - minValue;
    const pointsAll = interval / step;
    const points = Math.floor(pointsAll/ pointsForEach) + 1;

    for (let i = 0; i < points; i += 1) {
      const isNumber = i % numberForEach === 0;
      const isLong = i % longForEach === 0;

      this.points[i] = new Point(this.DOM, isNumber, isLong);
      this.DOM.appendChild(this.points[i].DOM);
    }
  }

  // определение координат точек на шкале
  private determineСoordScale(rangeSize: number) {
    const { isInvert } = this.config;

    const step = rangeSize / (this.points.length - 1);
    let coord = isInvert ? rangeSize : 0;

    this.points.forEach((elem) => {
      elem.setCoord(coord);

      coord = isInvert ? (coord -= step) : (coord += step);
    });
  }
} // class

export default Scale;
