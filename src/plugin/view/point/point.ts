import { createHTML } from '../../utils/mixins';
import Observable from '../../utils/observable';

class Point {
  Observable = new Observable();
  value: number = 0;
  coord: number = 0;
  DOM!: HTMLElement;
  lineDOM!: HTMLElement;
  numberDOM?: HTMLElement;

  constructor(parent: HTMLElement, isNumber: boolean, isLong: boolean) {
    this.init(parent, isNumber, isLong);
  }

  setValue(value: number) {
    this.value = value;

    if (this.numberDOM) {
      this.numberDOM.innerText = String(this.value);
    }
  }

  setCoord(coord: number) {
    this.coord = coord;
  }

  handlePointClick = () => {
    this.Observable.notify({
      value: this.value,
    });
  };

  private init(parent: HTMLElement, isNumber: boolean, isLong: boolean) {
    this.DOM = createHTML('<div class="rs-scale-point"></div>');

    if (isNumber) {
      this.numberDOM = createHTML('<div class="rs-scale-point__number"></div>');
      this.DOM.appendChild(this.numberDOM);
    }

    if (isLong)
      this.lineDOM = createHTML('<div class="rs-scale-point__long-line"></div>');
    else this.lineDOM = createHTML('<div class="rs-scale-point__short-line"></div>');
    this.DOM.appendChild(this.lineDOM);

    parent.appendChild(this.DOM);
  }
} 

export default Point;
