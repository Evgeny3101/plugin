import ElemDOM from '../../util/elemDOM';

class Range extends ElemDOM {
  isVertical: boolean;

  constructor(id: Element, isVertical: boolean) {
    super(id, 'div', 'js-range-slider');
    this.isVertical = isVertical;
    this.setClassPositon();
  }

  //  устанавливает класс(CSS), ответственный за положение диапазона
  setClassPositon() {
    if (this.isVertical) this.DOM.classList.add('js-range-slider__vertical');
    else this.DOM.classList.add('js-range-slider__horizontal');
  }
}

export default Range;
