import ElemDOM from '../../util/elemDOM';

class Range extends ElemDOM {
  constructor(id: Element) {
    super(id, 'div', 'js-range-slider');
  }

  //  устанавливает класс(CSS), ответственный за положение диапазона
  setClassPositon(vert: boolean) {
    if (vert) {
      const oldClass = this.DOM.classList.contains('js-range-slider__horizontal');
      if (oldClass) this.DOM.classList.remove('js-range-slider__horizontal');

      this.DOM.classList.add('js-range-slider__vertical');
    } else {
      const oldClass = this.DOM.classList.contains('js-range-slider__vertical');
      if (oldClass) this.DOM.classList.remove('js-range-slider__vertical');

      this.DOM.classList.add('js-range-slider__horizontal');
    }
  }
}

export default Range;
