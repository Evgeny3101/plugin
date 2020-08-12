import Observable from '../../util/observable';
import { createHTML } from '../../util/mixins';
import IPositionVars from '../interface/IVarsPosition';

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

  move(evnt) {
    const btn = evnt.currentTarget;
    const parent = evnt.path[1];
    const baseShift = evnt[this.pos.page];
    const rangeShift = btn[this.pos.offsetFrom];
    const rangeSize = parent[this.pos.clientSize] - btn[this.pos.offsetSize];

    document.onmousemove = (event: MouseEvent) => {
      let coords;

      if (this.isInvert) {
        coords = baseShift - event[this.pos.page] + (rangeSize - rangeShift);
      } else {
        coords = rangeShift - (baseShift - event[this.pos.page]);
      }

      // limit coords
      if (coords < 0) coords = 0;
      if (coords > rangeSize) coords = rangeSize;

      this.coord = coords;
      this.toPosition(this.coord);

      this.Observable.notify({
        coord: this.coord,
        index: this.index,
      });
    };

    document.onmouseup = () => {
      this.toPosition(this.coord);
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
