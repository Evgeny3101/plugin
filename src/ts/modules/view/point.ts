import {elemDOM} from './elemDOM'

class Point extends elemDOM {
  textField: elemDOM
  value: number
  coord: number

  constructor(id: Element) {
    super(id, 'div', 'js-scale-line')

  }
} // class


export {Point}