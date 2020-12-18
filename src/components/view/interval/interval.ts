import { createHTML } from '../../../ts/mixins';
import IVarsPosition from '../../interface/IVarsPosition';

class Interval {
  buttonSize: number = 0;
  DOM: HTMLElement;
  buttonsCoord!: number[];

  constructor(public pos: IVarsPosition, public isProgress: boolean) {
    this.DOM = createHTML(
      `<div class="rs-range-slider__interval">
        <div class="rs-slider-interval"></div>
      </div>`
    );
  }

  setButtonSize(buttonSize: number) {
    this.buttonSize = buttonSize;
  }

  setCoords(coords: number[]) {
    const buttonsCoord = [...coords];

    if (this.isProgress) {
      this.buttonsCoord = [0, buttonsCoord[0]];
    } else {
      this.buttonsCoord = buttonsCoord;
      this.checkOverrun();
    }
  }

  toPosition() {
    const { buttonsCoord, buttonSize } = this;
    const size = buttonsCoord[1] - buttonsCoord[0];
    const offset = buttonsCoord[0] + buttonSize / 2;

    this.DOM.setAttribute(
      'style',
      ` ${this.pos.offset}: ${offset}px;
        ${this.pos.size}: ${size}px;
      `
    );
  }

  private checkOverrun() {
    const isOverrun =
      this.buttonsCoord[0] > this.buttonsCoord[1] ||
      this.buttonsCoord[1] < this.buttonsCoord[0];

    if (isOverrun) this.buttonsCoord.reverse();
  }
}

export default Interval;
