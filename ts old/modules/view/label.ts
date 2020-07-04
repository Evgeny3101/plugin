import {elemDOM} from './elemDOM'
import {Observable} from '../../util/observable'

class Label extends elemDOM {
  Observable = new Observable();
  input: HTMLInputElement;
  show: Function;
  hide: Function;
  isInvert: Boolean;

  constructor(id: Element, onClick: boolean, isInvert: boolean){
    super(id, 'div', 'js-label-wrapper')
    this.isInvert = isInvert

    let container = document.createElement('div')
    container.className = 'js-label-container'
    this.DOM.appendChild(container)

    this.input = document.createElement('input')
    this.input.className = 'js-label-input'
    this.input.setAttribute('readonly', 'readonly')
    container.appendChild(this.input)


    if(onClick) this.onClick()
  } // constructor

  toPosition(coord: number, posit: string) {
    this.DOM.style[posit] = coord + 'px'
  }

  onClick() {
    this.DOM.style.display = "none"
    this.show = () => {
      this.DOM.style.display = "block"
    }
    this.hide = () => {
      this.DOM.style.display = "none"
    }
  }

  setValue(value: number) {
    if(this.isInvert) this.input.value = String(-value)
    else this.input.value = String(value)
  }

} // class

export {Label}