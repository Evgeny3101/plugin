import ElemDOM from '../../util/elemDOM';
import Button from './button';

class Interval extends ElemDOM {
  pos: { [key: string]: string };

  constructor(id: Element, pos: { [key: string]: string }) {
    super(id, 'div', 'js-range-interval');
    this.pos = pos;
  } // constructor

  toPosition(btns: Button[]) {
    const btnsCoord: number[] = [btns[0].coord, btns[1].coord];
    const btnSize = btns[0].DOM[this.pos.offsetSize];

    const begin = Math.min.apply(null, btnsCoord);
    const end = Math.max.apply(null, btnsCoord);
    const size = end - begin;

    this.DOM.setAttribute(
      'style',
      `${this.pos.offset} : ${begin + btnSize / 2}px; ${this.pos.size} : ${size}px;`
    );
  }
}

export default Interval;
