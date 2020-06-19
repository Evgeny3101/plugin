import '../util/mixins'
import {Observable} from '../util/observable'
import {Range} from './view/range'
import {Button} from './view/button'


class View {
  Observable = new Observable();
  mainDOM: Element
  range: Range
  button: Button[] = []
  size: number
  textFieldDOM: HTMLInputElement[] = [];
  stepSize: number;

  constructor(id: string) {
    this.mainDOM   =  document.querySelector(id)
    this.range     =  new Range(this.mainDOM)
    this.button[0] =  new Button(this.range.DOM)
  }

  // для преобразования значений в координаты
  convertValues(data) {
    let btn = this.button[0]
    let rangeInPx = this.range.DOM['clientWidth'] - btn.DOM['offsetWidth'];
    let valueRange = Math.abs(data.maxValue - data.minValue)
    this.stepSize = rangeInPx / valueRange

    btn.coord = this.stepSize * (data.value[0] + Math.abs(data.minValue))
    btn.toPosition()
  }

  // обновление координат
  updateCoords(data) {
    if(data.range === true) {
      for(let i = 0; i < data.value.length; i++) {
        let btn = this.button[i]
        btn.coord = this.stepSize * (data.value[i] + Math.abs(data.minValue))
        btn.toPosition()
      }
    }

    else {
      let btn = this.button[0]
      btn.coord = this.stepSize * (data.value[0] + Math.abs(data.minValue))
      btn.toPosition()
    }
  }


  setTextField(field: string[], value: number[]) {
    for(let i = 0; i < field.length; i++) {
      this.textFieldDOM[i] = document.querySelector(field[i]);
    }
    this.updateTextField(value)
  }

  updateTextField(value: number[]) {
    for(let i = 0; i < value.length; i++) {
      this.textFieldDOM[i].value = String(value[i])
    }
  }

}


export {View}