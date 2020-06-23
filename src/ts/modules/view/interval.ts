import {elemDOM} from './elemDOM'


class Interval extends elemDOM {
  pos: any

  constructor(id: Element, pos){
    super(id, 'div', 'js-range-interval')
    this.pos = pos

  } // constructor

  // для установки по координатам, с учетом ширины кнопки
  toPosition(data) {

    let btnsCoord: number[] = data.btnsCoord

    let begin =  Math.min.apply(null, btnsCoord)
    let end   =  Math.max.apply(null, btnsCoord)
    let size  =  end - begin

    this.DOM.style[this.pos.offset] =  begin + (data.btnSize / 2) +  'px'
    this.DOM.style[this.pos.size] =  size  +  'px'
  }



}


export {Interval}