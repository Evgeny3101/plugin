import {elemDOM} from "./elemDOM"

class Button extends elemDOM {

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

      btn.style['left'] = coords + 'px'
    }

    document.onmouseup  = () =>  {
      document.onmousemove = document.onmouseup = null;
    }

  }

} // class

export {Button}