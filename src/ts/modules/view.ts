import Observable from './observable'
import '../util/mixins'

export default class View {
  Observable = new Observable();
  elemDOM: Element
  rangeDOM: Element
  btnDOM: Element

  constructor(id: string) {
    this.elemDOM = document.querySelector(id)

    this.rangeDOM = document.createElement('div');
    this.rangeDOM.className = 'range-slider';
    this.elemDOM.appendChild(this.rangeDOM);
    this.btnDOM = document.createElement('button');
    this.btnDOM.className = 'range-btn';
    this.rangeDOM.appendChild(this.btnDOM);

  }


}




