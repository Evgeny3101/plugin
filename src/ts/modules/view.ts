import '../util/mixins'
import { Observable } from '../util/observable'
import { Range } from './view/range'
import { Button } from './view/button'
import { Interval } from './view/interval'
import { Label } from './view/label'
import { Scale } from './view/scale'
import { TextField } from './view/textField'


class View {
  Observable = new Observable()
  mainDOM: Element
  range: Range
  button: Button[] = []
  label: Label[] = []
  textField: TextField[] = []
  scale: Scale
  rangeSize: number
  interval: Interval
  step: number
  pos: {} = {}

  constructor(id: Element, config) {
    this.mainDOM   =  id
    this.range     =  new Range(this.mainDOM)
    this.init(config)
  }

  init(config) {
    // удалит установленые элементы
    this.range.DOM.innerHTML = ''

    // установка переменных для вертикального или горизонтального позиционирования
    this.setPositionVariables(config.vertical)

    // установка  кнопок
    this.button = []
    for(let i = 0; i <= Number(config.range); i++){
      this.button[i] = new Button(this.range.DOM, this.pos)
    }

    // установка  интервала  между кнопками
    if(config.range) {
      this.interval = new Interval(this.range.DOM, this.pos)
    }

    // установка  лейблов над кнопками
    if(config.label){
      this.label = []
      for(let i = 0; i < this.button.length; i++){
        this.label[i] = new Label(this.range.DOM, config.onClick, config.invert)
        this.label[i].input.value = config.value[i]
      }
    }

    // установка текстовых полей
    if(config.textField) {
      for(let i = 0; i < config.textField.length; i++) {
        this.textField[i] = new TextField( config.textField[i], config.invert )
        this.textField[i].updateTextField({
          value   : config.value,
          id      : i,
        })
      }
    }

    // установит значения this.rangeSize и this.step
    this.updateRangeSize({
      maxValue  : config.maxValue,
      minValue  : config.minValue
    })

    // установка  шкалы
    if(config.scale) {
      this.scale = new Scale(this.range.DOM, this.pos, config)
      this.scale.determineСoordScale(this.rangeSize)
      this.scale.setValue(config)
      this.scale.determineСoordScale(this.rangeSize)
    }

    // обновление координат и установка элементов
    this.updateCoords({
      range     : config.range,
      label     : config.label,
      minValue  : config.minValue,
      value     : config.value,
    })

    // установка слушателей
    this.setListeners( config )
  }

  // установка переменных для вертикального или горизонтального позиционирования
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

  // установка слушателей
  setListeners( config ) {

    // автоматическое обновление при изменении ширины экрана
    window.addEventListener('resize', () => {
      this.updateRangeSize({
        maxValue  : config.maxValue,
        minValue  : config.minValue
      })

      this.updateCoords({
        range     : config.range,
        label     : config.label,
        minValue  : config.minValue,
        value     : config.value,
      })
    })

    // перемещение бегунка
    for(let elem of this.button) {
      elem.DOM.addEventListener('mousedown', elem.move.bind(elem))
    }

    // при вводе значений в text-field
    for(let i = 0; i < this.textField.length; i++) {
      if(this.textField[i].DOM) {
        this.textField[i].DOM.addEventListener('blur', () => this.textField[i].toInputValues(i) )
      }

    }

    // клик на деление шкалы
    if(config.scale) {
      for(let i = 0; i < this.scale.points.length; i++) {
        this.scale.points[i].DOM.addEventListener('click', () => this.scale.pressScaleBar(this.button, config.range, i))
      }
    }

    // показывать / скрывать лейбл при нажатии
    if(config.onClick) {
      for(let i = 0; i < this.label.length; i++) {
        this.button[i].DOM.addEventListener('mousedown', this.label[i].show.bind(this.label[i]))
        document.addEventListener('mouseup', this.label[i].hide.bind(this.label[i]))
      }
    }
  }

  // установит значения this.rangeSize и this.step
  updateRangeSize(data) {
    let btn = this.button[0]
    this.rangeSize = this.range.DOM[this.pos.clientSize] - btn.DOM[this.pos.offsetSize];
    let valueRange = Math.abs(data.maxValue - data.minValue)

    this.step = this.rangeSize / valueRange
  }

  // обновление координат и установка элементов
  updateCoords(data) {
    if(data.range === true) {
      for(let i = 0; i < data.value.length; i++) {
        const newCoord = this.step  * (data.value[i] + Math.abs(data.minValue))

        this.button[i].toPosition(newCoord)
      }
      // установка интервала по координатам
      this.interval.toPosition([this.button[0], this.button[1]])
    }
    else {
      const newCoord = this.step  * (data.value[0] + Math.abs(data.minValue))
      this.button[0].toPosition(newCoord)
    }

    // для установка Label по координатам
    if( data.label ){
      for(let i = 0; i < this.label.length; i++){
        this.label[i].toPosition(this.button[i].coord, this.pos.offset)
        this.label[i].setValue(data.value[i])
      }
    }
  }

} // class View


export {View}