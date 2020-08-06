import ElemDOM from '../../util/elemDOM';

class Range extends ElemDOM {
  constructor(parent: Element, isVertical: boolean) {
    super(parent, 'div', 'js-range-slider');
    this.setClassPosition(isVertical);
  }

  //  устанавливает класс(CSS), ответственный за положение диапазона
  setClassPosition(isVertical: boolean) {
    if (isVertical) this.DOM.classList.add('js-range-slider__vertical');
    else this.DOM.classList.add('js-range-slider__horizontal');
  }
}

export default Range;
