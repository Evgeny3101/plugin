import { createHTML } from '../../utils/mixins';

class Label {
  DOM!: HTMLElement; // wrapper for label
  input!: HTMLInputElement; // container for value
  coord!: number;

  constructor(public isLabelOnClick: boolean, public positionName: string) {
    this.DOM = createHTML(
      `<div class="rs-range-slider__container-label">
        <div class="rs-button-label">
          <input class="rs-button-label__input" readonly> </input>
        </div>
      </div>`
    );
    this.input = <HTMLInputElement>this.DOM.firstElementChild!.firstElementChild;
  } // constructor

  setCoord(coord: number) {
    this.coord = coord;
  }

  toPosition() {
    this.DOM.setAttribute('style', `${this.positionName} : ${this.coord}px`);
  }

  setValue(value: string) {
    this.input.value = value;
  }

  handleButtonMousedown = () => {
    this.DOM.children[0].classList.remove('rs-button-label_hide');
  };

  handleButtonMouseup = () => {
    this.DOM.children[0].classList.add('rs-button-label_hide');
  };
} // class

export default Label;
