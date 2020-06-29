import {elemDOM} from './elemDOM'

class Range extends elemDOM {
  constructor(id: Element){
    super(id, 'div', 'js-range-slider')
  }

  //  устанавливает класс(CSS), ответственный за положение диапазона
  setClassPositon(vert: boolean){
    if(vert) {
      let oldClass = this.DOM.classList.contains('js-range-slider__horizontal')
      if(oldClass) this.DOM.classList.remove('js-range-slider__horizontal')

      this.DOM.classList.add('js-range-slider__vertical')
    } else {
      let oldClass = this.DOM.classList.contains('js-range-slider__vertical')
      if(oldClass) this.DOM.classList.remove('js-range-slider__vertical')

      this.DOM.classList.add('js-range-slider__horizontal')
    }
  }
}

export {Range}