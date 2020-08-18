import { createHTML } from '../../../ts/mixins';

class Point {
  value!: number;
  coord!: number;
  lineDOM: HTMLElement;
  DOM: HTMLElement;
  numberDOM?: HTMLElement;

  constructor(parent: Element, isNumber: boolean, isLong: boolean) {
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
} // class

export default Point;
