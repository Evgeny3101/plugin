import { createHTML } from '../../../ts/mixins';

class Label {
  DOM!: HTMLInputElement;   // wrapper for label
  input!: HTMLInputElement; // container for value
  coord!: number;
  handleButtonMousedown!: EventListener;
  handleButtonMouseup!: EventListener;

  constructor(
    parent: Element,
    public isLabelOnClick: boolean,
    public positionName: string
  ) {
    this.createElements(parent);

    if (isLabelOnClick) {
      this.handleButtonMousedown = this.show.bind(this);
      this.handleButtonMouseup = this.hide.bind(this);
    }
  } // constructor

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

  private createElements(parent: Element) {
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
} // class

export default Label;
