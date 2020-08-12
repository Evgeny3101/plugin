import IPositionVars from '../interface/IVarsPosition';
import { createHTML } from '../../util/mixins';

class Interval {
  buttonSize: number = 0;
  DOM: Element;

  constructor(parent: Element, public pos: IPositionVars) {
    this.DOM = createHTML('<div class="js-range-interval"></div>', parent);
  }

  setButtonSize(buttonSize: number) {
    this.buttonSize = buttonSize;
  }

  toPosition(coords: number[]) {
    const size = coords[1] - coords[0];

    this.DOM.setAttribute(
      'style',
      `${this.pos.offset} : ${coords[0] + this.buttonSize / 2}px; ${
        this.pos.size
      } : ${size}px;`
    );
  }
}

export default Interval;
