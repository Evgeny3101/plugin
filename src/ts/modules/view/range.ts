import ElemDOM from '../../util/elemDOM';

class Range extends ElemDOM {
  constructor() {
    super('div', 'js-range-slider');
  }

  // sets the class (CSS) responsible for the position of the range
  setClassPosition(isVertical: boolean) {
    if (isVertical) this.DOM.classList.add('js-range-slider__vertical');
    else this.DOM.classList.add('js-range-slider__horizontal');
  }
}

export default Range;
