import {elemDOM} from './elemDOM'
import { Button } from './button'


class Interval extends elemDOM {
  pos: any

  constructor(id: Element, pos){
    super(id, 'div', 'js-range-interval')
    this.pos = pos

  } // constructor

  // для установки по координатам, с учетом ширины кнопки
  toPosition(btns: Button[]) {

    let btnsCoord: number[] = [btns[0].coord, btns[1].coord]
    let btnSize = btns[0].DOM[this.pos.offsetSize]

    let begin =  Math.min.apply(null, btnsCoord)
    let end   =  Math.max.apply(null, btnsCoord)
    let size  =  end - begin

    this.DOM.style[this.pos.offset] =  begin + (btnSize/ 2) + 'px'
    this.DOM.style[this.pos.size]   =  size + 'px'
  }



}


export {Interval}