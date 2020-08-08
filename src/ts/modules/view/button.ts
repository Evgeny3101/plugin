import ElemDOM from '../../util/elemDOM';
import Observable from '../../util/observable';
import IPositionVars from '../interface/IVarsPosition';

class Button extends ElemDOM {
  Observable = new Observable();
  pos: IPositionVars;
  coord!: number;
  index: number;

  constructor(parent: Element, pos: IPositionVars, index: number) {
    super('div', 'js-range-btn', parent);
    this.pos = pos;
    this.index = index;
  } // constructor

  move(evnt) {
    const btn = evnt.currentTarget;
    const parent = evnt.path[1];
    const baseShift = evnt[this.pos.page];
    const rangeShift = btn[this.pos.offsetFrom];
    const rangeSize = parent[this.pos.clientSize] - btn[this.pos.offsetSize];

    document.onmousemove = (event: MouseEvent) => {
      let coords;

      if (this.pos.isInvert) {
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
