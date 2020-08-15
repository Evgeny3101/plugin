import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';

class Label {
  Observable = new Observable();
  input!: HTMLInputElement;
  DOM!: Element;
  buttonSize: number = 0;

  constructor(parent: Element, public labelOnClick: boolean) {
    this.createElements(parent);
  } // constructor

  createElements(parent: Element) {
    this.DOM = createHTML(
      `<div class="js-range-slider__container-label">
        <div class="js-button-label">
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
    this.DOM.children[0].classList.remove('js-button-label__hide');
  }

  hide() {
    this.DOM.children[0].classList.add('js-button-label__hide');
  }

  setValue(value: number) {
    this.input.value = String(value);
  }
} // class

export default Label;
