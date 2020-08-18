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
  }

  setCoord(coord: number, index: number) {
    this.buttonsCoord[index] = coord;
  }

  toPosition() {
    const size = this.buttonsCoord[1] - this.buttonsCoord[0];
    const offset = this.buttonsCoord[0] + this.buttonSize / 2;

    this.DOM.setAttribute(
      'style',
      ` ${this.pos.offset}: ${offset}px;
        ${this.pos.size}: ${size}px;
      `
    );
  }
}

export default Interval;
