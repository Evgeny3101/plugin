import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';

class Point {
  Observable = new Observable();
  value!: number;
  coord!: number;
  DOM: HTMLElement;
  lineDOM: HTMLElement;
  numberDOM?: HTMLElement;

  constructor(parent: HTMLElement, isNumber: boolean, isLong: boolean) {
    this.DOM = createHTML('<div class="js-scale-point"></div>', parent);

    if (isNumber) {
      this.numberDOM = createHTML('<div class="js-scale-point__number"></div>', this.DOM);
    }

    if (isLong)
      this.lineDOM = createHTML(
        '<div class="js-scale-point__long-line"></div>',
        this.DOM
      );
    else
      this.lineDOM = createHTML(
        '<div class="js-scale-point__short-line"></div>',
        this.DOM
      );
  }

  handlePointClick = () => {
    this.Observable.notify({
      value: this.value,
    });
  };
} // class

export default Point;
