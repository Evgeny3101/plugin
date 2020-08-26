import { createHTML } from '../../../ts/mixins';
import IPositionVars from '../../interface/IVarsPosition';

class Interval {
  buttonSize: number = 0;
  DOM: Element;
  buttonsCoord!: number[];

  constructor(parent: Element, public pos: IPositionVars) {
    this.DOM = createHTML(
      `
      <div class="js-range-slider__container-interval">
        <div class="js-slider-interval"></div>
      </div>`,
      parent
    );
  }

  setButtonValue(buttonSize: number) {
    this.buttonSize = buttonSize;
  }

  setBaseCoords(coords: number[]) {
    this.buttonsCoord = coords;
    this.checkOverrun();
  }

  checkOverrun() {
    const isOverrun =
      this.buttonsCoord[0] > this.buttonsCoord[1] ||
      this.buttonsCoord[1] < this.buttonsCoord[0];

    if (isOverrun) this.buttonsCoord.reverse();
  }

  setCoord(coord: number, index: number) {
    this.buttonsCoord[index] = coord;
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
}

export default Interval;
