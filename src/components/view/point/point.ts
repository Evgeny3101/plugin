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
    this.DOM = createHTML('<div class="rs-scale-point"></div>');

    if (isNumber) {
      this.numberDOM = createHTML('<div class="rs-scale-point__number"></div>');
      this.DOM.appendChild(this.numberDOM);
    }

    if (isLong)
      this.lineDOM = createHTML('<div class="rs-scale-point__long-line"></div>');
    else this.lineDOM = createHTML('<div class="rs-scale-point__short-line"></div>');
    this.DOM.appendChild(this.lineDOM);

    parent.appendChild(this.DOM);
  }

  handlePointClick = () => {
    this.Observable.notify({
      value: this.value,
    });
  };
} // class

export default Point;
