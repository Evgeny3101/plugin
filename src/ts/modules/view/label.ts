import ElemDOM from '../../util/elemDOM';
import Observable from '../../util/observable';

class Label extends ElemDOM {
  Observable = new Observable();
  input: HTMLInputElement;
  invert: Boolean;
  lableOnClick: boolean;

  constructor(id: Element, lableOnClick: boolean, invert: boolean) {
    super(id, 'div', 'js-label-wrapper');
    this.invert = invert;
    this.lableOnClick = lableOnClick;

    const container = document.createElement('div');
    container.className = 'js-label-container';
    this.DOM.appendChild(container);

    this.input = document.createElement('input');
    this.input.className = 'js-label-input';
    this.input.setAttribute('readonly', 'readonly');
    container.appendChild(this.input);

    if (this.lableOnClick) this.DOM.style.display = 'none';
  } // constructor

  toPosition(coord: number, key: string) {
    this.DOM.setAttribute('style', `${key} : ${coord}px`);
  }

  show() {
    this.DOM.style.display = 'block';
  }

  hide() {
    this.DOM.style.display = 'none';
  }

  setValue(value: number) {
    if (this.invert) this.input.value = String(-value);
    else this.input.value = String(value);
  }
} // class

export default Label;
