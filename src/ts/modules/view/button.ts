import {elemDOM} from './elemDOM'
import {Observable} from '../../util/observable'

class Button extends elemDOM {
  Observable = new Observable();
  pos: any;
  coord: number;

  constructor(id: Element, pos){
    super(id, 'div', 'js-range-btn')
    this.pos = pos

  } // constructor

  move(evt) {
    const btn = evt.target;
    const parent = evt.path[1];
    const baseShift  =  evt[this.pos.page];
    const rangeShift =  btn[this.pos.offsetFrom]
    const rangeSize  =  parent[this.pos.clientSize] - btn[this.pos.offsetSize];

    document.onmousemove  = (evt) => {
      let coords =  rangeShift - (baseShift - event[this.pos.page])

      // limit coords
      if (coords < 0) coords =  0;
      if (coords > rangeSize) coords =  rangeSize;

      this.coord = coords
      this.toPosition(this.coord)

      this.Observable.notify({
        coord     : this.coord,
        elem      : this
      })
    }

    document.onmouseup  = () =>  {
      this.toPosition(this.coord)
      document.onmousemove = document.onmouseup = null;
    }

    return false
  }

  toPosition(coord: number) {
    this.coord = coord
    this.DOM.style[this.pos.offset] = this.coord + 'px'
  }

} // class

export {Button}