import ElemDOM from '../../util/elemDOM';
import Observable from '../../util/observable';

class Label extends ElemDOM {
  Observable = new Observable();
  input: HTMLInputElement;
  labelOnClick: boolean;

  constructor(parent: Element, labelOnClick: boolean) {
    super(parent, 'div', 'js-label-wrapper');
    this.labelOnClick = labelOnClick;

    const container = document.createElement('div');
    container.className = 'js-label-container';
    this.DOM.appendChild(container);

    this.input = document.createElement('input');
    this.input.className = 'js-label-input';
    this.input.setAttribute('readonly', 'readonly');
    container.appendChild(this.input);
  } // constructor

  toPosition(coord: number, key: string) {
    this.DOM.setAttribute('style', `${key} : ${coord}px`);
  }

  show() {
    this.DOM.classList.remove('js-label__hide');
  }

  hide() {
    this.DOM.classList.add('js-label__hide');
  }

  setValue(value: number) {
    this.input.value = String(value);
  }
} // class

export default Label;
