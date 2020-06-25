import '../util/mixins'
import {Observable} from '../util/observable'
import {Range} from './view/range'
import {Button} from './view/button'
import {Interval} from './view/interval'
import {Label} from './view/label'


class View {
  Observable = new Observable()
  mainDOM: Element
  range: Range
  button: Button[] = []
  interval: Interval
  size: number
  textFieldDOM: HTMLInputElement[] = []
  step: number
  pos: {} = {}
  label: Label[] = []

  constructor(id: string) {
    this.mainDOM   =  document.querySelector(id)
    this.range     =  new Range(this.mainDOM)
  }


  // для преобразования значений в координаты и установка кнопок
  setStepInPx(data) {
    for(let i = 0; i < this.button.length; i++) {
      let btn = this.button[i]
      let rangeInPx = this.range.DOM[this.pos.clientSize] - btn.DOM[this.pos.offsetSize];
      let valueRange = Math.abs(data.maxValue - data.minValue)
      this.step = rangeInPx / valueRange

      // btn.coord = this.step  * (data.value[i] + Math.abs(data.minValue))
      // btn.toPosition()
    }
  }

  // обновление координат для элементов
  updateCoords(data) {
    if(data.range === true) {
      for(let i = 0; i < data.value.length; i++) {
        this.button[i].coord = this.step  * (data.value[i] + Math.abs(data.minValue))

        this.button[i].toPosition()
      }
      // для интервала
      this.updateInterval()
    }
    else {
      this.button[0].coord = this.step * (data.value[0] + Math.abs(data.minValue))
    }

    // для Label
    this.updateLabel(data.value)

  }

  // устанавливает переменные позиций
  // для переключения горизонтального и вертикального видов
  setPositionVariables(vertical: boolean){
    if(vertical) {
      this.pos = {
        // range
        offset     : 'top',
        size       : 'height',
        clientSize : 'clientHeight',
        offsetSize : 'offsetHeight',
        // btn
        page       : 'pageY',
        offsetFrom : 'offsetTop',
      }
    } else {
      this.pos = {
        // range
        offset     : 'left',
        size       : 'width',
        clientSize : 'clientWidth',
        offsetSize : 'offsetWidth',
        // btn
        page       : 'pageX',
        offsetFrom : 'offsetLeft',
      }
    }

    this.range.setClassPositon(vertical)

  }

  // создание кнопок
  setBtn(isRange: boolean) {
    this.range.DOM.innerHTML = ''
    this.button = []
    for(let i = 0; i <= Number(isRange); i++){
      this.button[i] =  new Button(this.range.DOM, this.pos)
    }
  }

  // интервал между кнопками
  setInterval() {
    this.interval = new Interval(this.range.DOM, this.pos)
  }

  updateInterval() {
    this.interval.toPosition({
      btnsCoord : [this.button[0].coord, this.button[1].coord],
      btnSize   : this.button[0].DOM.offsetWidth
    })
  }

  // текстовое поле
  setTextField(field: string[]) {
    for(let i = 0; i < field.length; i++) {
      this.textFieldDOM[i] = document.querySelector(field[i]);
    }
  }

  updateTextField(value: number[]) {
    for(let i = 0; i < value.length; i++) {
      if(this.textFieldDOM[i]) {
        this.textFieldDOM[i].value = String(value[i])
      }
    }
  }

  // лейблы над кнопками
  setLabel(data){
    this.label = []
    for(let i = 0; i <= Number(data.range); i++){
      this.label[i] =  new Label(this.range.DOM)
      this.label[i].input.value = data.value[i]
    }
  }

  updateLabel(value: number[]) {
    for(let i = 0; i < this.label.length; i++){
      this.label[i].toPosition(this.button[i].coord, this.pos.offset)
      this.label[i].input.value =  String(value[i])
    }
  }
}


export {View}