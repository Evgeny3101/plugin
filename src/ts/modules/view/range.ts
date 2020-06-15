import {elemDOM} from "./elemDOM"

class Range extends elemDOM {
  constructor(id: Element){
    super(id, 'div', 'range-slider')
  }

}

export {Range}