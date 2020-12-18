import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';
import IVarsPosition from '../../interface/IVarsPosition';

class Button {
  Observable = new Observable();
  coord!: number;
  DOM: HTMLElement;

  constructor(public pos: IVarsPosition, public isInvert: boolean) {
    this.DOM = createHTML('<div class="rs-range-slider__button"></div>');
  } // constructor

  handleButtonMousedown = (evt: MouseEvent): boolean => {
    const { page, offsetFrom, offsetSize, clientSize } = this.pos;
    const { isInvert } = this;

    const btnDOM: HTMLElement = (<HTMLElement>evt.target)!;
    const parentDOM: HTMLElement = btnDOM.parentElement!;
    const basePositionMouse: number = evt[page];
    const rangeShift: number = btnDOM[offsetFrom];
    const rangeSize: number = parentDOM[clientSize] - btnDOM[offsetSize];

    document.onmousemove = (event: MouseEvent) => {
      let newCoord;
      const currentPositionMouse: number = event[page];
      if (isInvert) {
        newCoord = basePositionMouse - currentPositionMouse + (rangeSize - rangeShift);
      } else {
        newCoord = rangeShift - (basePositionMouse - currentPositionMouse);
      }

      // limit coords
      if (newCoord < 0) newCoord = 0;
      if (newCoord > rangeSize) newCoord = rangeSize;

      this.setCoord(newCoord);

      this.Observable.notify({
        isMouseDown: true,
      });
    };

    document.onmouseup = () => {
      this.Observable.notify({
        isMouseDown: false,
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };

    return false;
  };

  setCoord(coord: number) {
    this.coord = coord;
  }

  toPosition() {
    this.DOM.setAttribute('style', `${this.pos.offset} : ${this.coord}px`);
  }
} // class

export default Button;
