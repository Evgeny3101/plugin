import ElemDOM from '../../util/elemDOM';
import Observable from '../../util/observable';

class Button extends ElemDOM {
  Observable = new Observable();
  pos: { [key: string]: string } = {};
  coord!: number;
  isInvert: boolean;

  constructor(id: Element, pos: { [key: string]: string }, isInvert: boolean) {
    super(id, 'div', 'js-range-btn');
    this.isInvert = isInvert;
    this.pos = pos;
  } // constructor

  move(evt) {
    const btn = evt.target;
    const parent = evt.path[1];
    const baseShift = evt[this.pos.page];
    const rangeShift = btn[this.pos.offsetFrom];
    const rangeSize = parent[this.pos.clientSize] - btn[this.pos.offsetSize];

    document.onmousemove = (event) => {
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
        elem: this,
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
