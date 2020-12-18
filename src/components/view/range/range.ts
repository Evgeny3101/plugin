import { createHTML } from '../../../ts/mixins';

class Range {
  DOM: HTMLElement;
  constructor() {
    this.DOM = createHTML('<div class="rs-range-slider"></div>');
  }

  // устанавливает класс (CSS), отвечающий за положение диапазона
  setClassPosition(isVertical: boolean) {
    if (isVertical) this.DOM.classList.add('rs-range-slider_vertical');
    else this.DOM.classList.add('rs-range-slider_horizontal');
  }
}

export default Range;
