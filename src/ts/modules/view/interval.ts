import ElemDOM from '../../util/elemDOM';
import IPositionVars from '../interface/IVarsPosition';

class Interval extends ElemDOM {
  pos!: IPositionVars;
  buttonSize!: number;

  constructor(parent?: Element) {
    super('div', 'js-range-interval', parent);
  } // constructor

  setInterval(buttonSize: number, pos: IPositionVars) {
    this.pos = pos;
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
