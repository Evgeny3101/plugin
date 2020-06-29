import {elemDOM} from './elemDOM'
import {Observable} from '../../util/observable'

class Label extends elemDOM {
  Observable = new Observable();
  input: HTMLInputElement;

  constructor(id: Element){
    super(id, 'div', 'js-label-wrapper')

    let container = document.createElement('div')
    container.className = 'js-label-container'
    this.DOM.appendChild(container)
    this.DOM.style.display = "none"

    this.input = document.createElement('input')
    this.input.className = 'js-label-input'
    this.input.setAttribute('readonly', 'readonly')
    container.appendChild(this.input)
  } // constructor

  toPosition(coord: number, posit: string) {
    this.DOM.style[posit] = coord + 'px'
  }

  show(){
    this.DOM.style.display = "block"
  }

  hide(){
    this.DOM.style.display = "none"
  }
} // class

export {Label}