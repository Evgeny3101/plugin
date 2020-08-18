import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';

class Label {
  Observable = new Observable();
  input!: HTMLInputElement;
  DOM!: HTMLInputElement;
  buttonSize: number = 0;
  coord!: number;

  constructor(
    parent: Element,
    public labelOnClick: boolean,
    public positionName: string
  ) {
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

  setCoord(coord: number) {
    this.coord = coord;
  }

  toPosition() {
    this.DOM.setAttribute('style', `${this.positionName} : ${this.coord}px`);
  }

  show() {
    this.DOM.children[0].classList.remove('js-button-label_hide');
  }

  hide() {
    this.DOM.children[0].classList.add('js-button-label_hide');
  }

  setValue(value: number) {
    this.input.value = String(value);
  }
} // class

export default Label;
