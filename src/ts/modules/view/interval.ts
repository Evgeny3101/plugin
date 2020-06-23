import {elemDOM} from './elemDOM'


class Interval extends elemDOM {

  constructor(id: Element){
    super(id, 'div', 'range-interval')

  } // constructor

  // для установки по координатам, с учетом ширины кнопки
  toPosition(data) {

    let btnsCoord: number[] = data.btnsCoord

    let begin =  Math.min.apply(null, btnsCoord)
    let end   =  Math.max.apply(null, btnsCoord)
    let size  =  end - begin

    this.DOM.style['left'] =  begin + (data.btnSize / 2) +  'px'
    this.DOM.style['width'] =  size  +  'px'
  }



}


export {Interval}