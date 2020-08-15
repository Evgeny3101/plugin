import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';
import IPositionVars from '../../interface/IVarsPosition';

class Button {
  Observable = new Observable();
  coord!: number;
  DOM: Element;

  constructor(
    public parent: Element,
    public pos: IPositionVars,
    public index: number,
    public isInvert: boolean
  ) {
    this.DOM = createHTML('<div class="js-slider-button"></div>', parent);
  } // constructor

  handleButtonMousedown(evt) {
    const btn = evt.target;
    const parent = evt.path[1];
    const basePositionMouse = evt[this.pos.page];
    const rangeShift = btn[this.pos.offsetFrom];
    const rangeSize = parent[this.pos.clientSize] - btn[this.pos.offsetSize];

    document.onmousemove = (event: MouseEvent) => {
      let coords;
      const currentPositionMouse = event[this.pos.page];

      if (this.isInvert) {
        coords = basePositionMouse - currentPositionMouse + (rangeSize - rangeShift);
      } else {
        coords = rangeShift - (basePositionMouse - currentPositionMouse);
      }

      // limit coords
      if (coords < 0) coords = 0;
      if (coords > rangeSize) coords = rangeSize;

      this.coord = coords;

      this.Observable.notify({
        coord: this.coord,
        index: this.index,
      });
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };

    return false;
  }

  toPosition(coord: number) {
    this.coord = coord;
    this.DOM.setAttribute('style', `${this.pos.offset} : ${this.coord}px`);
  }
} // class

export default Button;
