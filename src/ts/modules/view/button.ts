import {elemDOM} from "./elemDOM"
import {Observable} from '../../util/observable'

class Button extends elemDOM {
  Observable = new Observable();

  constructor(id: Element){
    super(id, 'div', 'range-btn')

  } // constructor

  move(evt) {
    const btn = evt.target;
    const parent = evt.path[1];

    const baseShift  =  evt['pageX'];
    const rangeShift =  btn['offsetLeft']
    const rangeSize  =  parent['clientWidth'] - btn['offsetWidth'];

    document.onmousemove  = (evt) => {
      let coords =  rangeShift - (baseShift - event['pageX'])

      // limit coords
      if (coords < 0) coords =  0;
      if (coords > rangeSize) coords =  rangeSize;

      this.coord = coords

      this.Observable.notify({
        coord     : this.coord,
        elem      : this
      })
    }

    document.onmouseup  = () =>  {
      document.onmousemove = document.onmouseup = null;
    }

    return
  }

  toPosition() {
    this.DOM.style['left'] = this.coord + 'px'
  }

} // class

export {Button}