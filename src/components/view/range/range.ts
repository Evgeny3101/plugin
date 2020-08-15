import { createHTML } from '../../../ts/mixins';

class Range {
  DOM: Element;
  constructor() {
    this.DOM = createHTML('<div class="js-range-slider"></div>');
  }

  // sets the class (CSS) responsible for the position of the range
  setClassPosition(isVertical: boolean) {
    if (isVertical) this.DOM.classList.add('js-range-slider_vertical');
    else this.DOM.classList.add('js-range-slider_horizontal');
  }
}

export default Range;
