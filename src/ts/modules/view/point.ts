import { createHTML } from '../../util/mixins';

class Point {
  value!: number;
  coord!: number;
  lineDOM: Element;
  DOM: Element;
  numberDOM?: Element;

  constructor(parent: Element, isNumber: boolean, isLong: boolean) {
    this.DOM = createHTML('<div class="js-scale-line"></div>', parent);

    if (isNumber) {
      this.numberDOM = createHTML('<div class="js-scale-line__number"></div>', this.DOM);
    }

    if (isLong)
      this.lineDOM = createHTML('<div class="js-scale-line__long"></div>', this.DOM);
    else this.lineDOM = createHTML('<div class="js-scale-line__short"></div>', this.DOM);
  }
} // class

export default Point;
