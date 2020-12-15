import { createHTML } from '../../../ts/mixins';

class Label {
  DOM!: HTMLElement; // wrapper for label
  input!: HTMLInputElement; // container for value
  coord!: number;

  constructor(
    parent: HTMLElement,
    public isLabelOnClick: boolean,
    public positionName: string
  ) {
    this.createElements(parent);
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
    this.DOM.children[0].classList.remove('js-button-label_hide');
  };

  handleButtonMouseup = () => {
    this.DOM.children[0].classList.add('js-button-label_hide');
  };

  private createElements(parent: HTMLElement) {
    this.DOM = createHTML(
      `<div class="js-range-slider__container-label">
        <div class="js-button-label">
          <input class="js-button-label__input" readonly> </input>
        </div>
      </div>`,
      parent
    );
    this.input = <HTMLInputElement>this.DOM.querySelector('input')!;
  }
} // class

export default Label;
