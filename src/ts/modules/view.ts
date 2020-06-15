import '../util/mixins'
import {Observable} from '../util/observable'
import {Range} from "./view/range"
import {Button} from "./view/button"


class View {
  Observable = new Observable();
  mainDOM: Element
  range: Range
  button: Button[] = []
  size: number

  constructor(id: string) {
    this.mainDOM   =  document.querySelector(id)
    this.range     =  new Range(this.mainDOM)
    this.button[0] =  new Button(this.range.DOM)
  }

}


export {View}