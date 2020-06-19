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

  constructor(id: string) {
    this.mainDOM   =  document.querySelector(id)
    this.range     =  new Range(this.mainDOM)
    this.button[0] =  new Button(this.range.DOM)
  }

  setTextField(field: string[], value: number[]) {
    for(let i = 0; i < field.length; i++) {
      this.textFieldDOM[i] = document.querySelector(field[i]);
      if(this.textFieldDOM[i] === null) console.log('textFieldDOM is null, field not found')
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