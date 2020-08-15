import { createHTML } from '../../../ts/mixins';
import IPositionVars from '../../interface/IVarsPosition';


class Interval {
  buttonSize: number = 0;
  DOM: Element;

  constructor(parent: Element, public pos: IPositionVars) {
    this.DOM = createHTML(`
      <div class="js-range-slider__container-interval">
        <div class="js-slider-interval"></div>
      </div>`
    , parent);
  }

  setButtonSize(buttonSize: number) {
    this.buttonSize = buttonSize;
  }

  toPosition(coords: number[]) {
    const size = coords[1] - coords[0];
    const offset = coords[0] + this.buttonSize / 2;

    this.DOM.setAttribute(
      'style', `
      ${this.pos.offset} : ${offset}px;
      ${this.pos.size}   : ${size}px;
      `
    );
  }
}

export default Interval;
