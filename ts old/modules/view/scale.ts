import {Observable} from '../../util/observable'
import { Point } from './point'
import {elemDOM} from './elemDOM'
import {roundToMultiple} from '../../util/mixins'

class Scale extends elemDOM {
  Observable = new Observable()
  points: Point[] = []
  numbers: elemDOM[] = []
  long: elemDOM[] = []
  short: elemDOM[] = []
  coord: number
  pos: any
  isInvert: boolean

  constructor(id: Element, pos, data){
    super(id, 'div', 'js-scale-range')
    this.pos = pos
    this.isInvert = data.isInvert
    this.setPoints(data)
  }

  // установка точек шкалы
  setPoints(data) {
    for(let i = 0; i < data.points; i++) {
      this.points[i] = new Point(this.DOM)
      const point = this.points[i]

      if(i % data.numberForEach === 0) {
        point.textField = new elemDOM(point.DOM, "div", 'js-scale-line__number')
      }

      if(i % data.longForEach === 0) {
        new elemDOM(point.DOM, "div", 'js-scale-line__long')
      }
      else {
        new elemDOM(point.DOM, "div", 'js-scale-line__short')
      }
    }
  }

  setValue(data) {
    const rangeValues = Math.abs(data.minValue) + data.maxValue
    const step = rangeValues / (this.points.length - 1)

    let currentValue = data.minValue

    for(let elem of this.points) {
      elem.value = (roundToMultiple(currentValue, data.step))

      if(elem.textField) {
        if(this.isInvert) elem.textField.DOM.innerText = String(-elem.value)
        else elem.textField.DOM.innerText = String(elem.value)
      }
      currentValue += step
    }
  }

  // определение координат полос шкалы
  determineСoordScale(rangeSize: number) {
    const step = rangeSize / (this.points.length - 1)
    let coord = 0

    for(let elem of this.points) {
      elem.coord = coord
      coord += step
    }
  }


  // обработчик нажатия на полосу шкалы
  pressScaleBar(buttonArr, isRange: boolean, id: number){
    let scale = this.points[id].coord
    let btnId
    if(!isRange) {
      buttonArr[0].toPosition(scale)
      btnId = 0
    }
    else {
      let btn1 = buttonArr[0].coord
      let btn2 = buttonArr[1].coord
      let range = Math.abs(btn2) - Math.abs(btn1)
      let diaposon = (range / 2) + Math.abs(btn1)
      if(scale > diaposon)  btnId = 1
      else                  btnId = 0
    }

    this.Observable.notify({
      value     : this.points[id].value,
      id        : btnId
    })
  }


} // class


export {Scale}