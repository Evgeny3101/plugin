import '../util/mixins'
import {Observable} from '../util/observable'
import {Range} from './view/range'
import {Button} from './view/button'
import {Interval} from './view/interval'
import {Label} from './view/label'
import {Scale} from './view/scale'


class View {
  Observable = new Observable()
  mainDOM: Element
  range: Range
  button: Button[] = []
  interval: Interval
  size: number
  textFieldDOM: HTMLInputElement[] = []
  step: number
  label: Label[] = []
  scale: Scale
  rangeSize: number
  pos: {} = {}

  constructor(id: Element) {
    this.mainDOM   =  id
    this.range     =  new Range(this.mainDOM)
  }


  // для преобразования значений в координаты и установка кнопок
  setStepInPx(data) {
    for(let i = 0; i < this.button.length; i++) {
      let btn = this.button[i]
      this.rangeSize = this.range.DOM[this.pos.clientSize] - btn.DOM[this.pos.offsetSize];
      let valueRange = Math.abs(data.maxValue - data.minValue)
      this.step = this.rangeSize / valueRange
    }
  }

  // обновление координат для элементов
  updateCoords(data) {
    if(data.range === true) {
      for(let i = 0; i < data.value.length; i++) {
        const newCoord = this.step  * (data.value[i] + Math.abs(data.minValue))

        this.button[i].toPosition(newCoord)
      }
      // для интервала
      this.updateInterval()
    }
    else {
      const newCoord = this.step  * (data.value[0] + Math.abs(data.minValue))
      this.button[0].toPosition(newCoord)
    }

    // для Label
    this.updateLabel(data.value)
  }

  //// устанавливает переменные позиций ////
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

  //// создание кнопок ////
  setBtn(isRange: boolean) {
    this.range.DOM.innerHTML = ''
    this.button = []
    for(let i = 0; i <= Number(isRange); i++){
      this.button[i] =  new Button(this.range.DOM, this.pos)
    }
  }

  //// интервал между кнопками ////
  setInterval() {
    this.interval = new Interval(this.range.DOM, this.pos)
  }

  updateInterval() {
    this.interval.toPosition([this.button[0], this.button[1]])
  }

  //// текстовое поле ////
  setTextField(field: string[]) {
    for(let i = 0; i < field.length; i++) {
      this.textFieldDOM[i] = document.querySelector(field[i]);
    }
  }

  updateTextField(value: number[], isInvert: boolean) {
    for(let i = 0; i < value.length; i++) {
      if(this.textFieldDOM[i]) {
        if(isInvert) this.textFieldDOM[i].value = String(-value[i])
        else this.textFieldDOM[i].value = String(value[i])
      }
    }
  }

  //// лейблы над кнопками ////
  setLabel(data){
    this.label = []
    for(let i = 0; i < this.button.length; i++){
      this.label[i] =  new Label(this.range.DOM, data.onClick, data.isInvert)
      this.label[i].input.value = data.value[i]
    }
    // показывать / скрывать лейбл при нажатии
    if(data.onClick) {
      for(let i = 0; i < this.label.length; i++) {
        this.button[i].DOM.addEventListener('mousedown', this.label[i].show.bind(this.label[i]))
        this.button[i].DOM.addEventListener('mouseup', this.label[i].hide.bind(this.label[i]))
      }
    }
  }

  updateLabel(value: number[]) {
    for(let i = 0; i < this.label.length; i++){
      this.label[i].toPosition(this.button[i].coord, this.pos.offset)
      this.label[i].setValue(value[i])
    }
  }

  //// шкала ////
  setScale(data) {
    this.scale = new Scale(this.range.DOM, this.pos, data)
    this.scale.determineСoordScale(this.rangeSize)
    this.scale.setValue(data)
  }


} // class View


export {View}