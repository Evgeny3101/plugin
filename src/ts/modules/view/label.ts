import Observable from '../../util/observable';
import { createHTML } from '../../util/mixins';

class Label {
  Observable = new Observable();
  input!: HTMLInputElement;
  DOM!: Element;

  constructor(parent: Element, public labelOnClick: boolean) {
    this.createElements(parent);
  } // constructor

  createElements(parent: Element) {
    this.DOM = createHTML(
      `<div class="js-button-label">
        <div class="js-button-label__container">
          <input class="js-button-label__input" readonly> </input>
        </div>
      </div>`,
      parent
    );
    this.input = this.DOM.querySelector('input')!;
  }

  toPosition(coord: number, key: string) {
    this.DOM.setAttribute('style', `${key} : ${coord}px`);
  }

  show() {
    this.DOM.classList.remove('js-button-label__hide');
  }

  hide() {
    this.DOM.classList.add('js-button-label__hide');
  }

  setValue(value: number) {
    this.input.value = String(value);
  }
} // class

export default Label;
