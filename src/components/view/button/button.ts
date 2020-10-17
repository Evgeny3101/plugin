import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';
import IPositionVars from '../../interface/IVarsPosition';

class Button {
  Observable = new Observable();
  coord!: number;
  DOM: Element;
  handleButtonMousedown: EventListener;

  constructor(
    parent: Element,
    public pos: IPositionVars,
    public index: number,
    public isInvert: boolean
  ) {
    this.DOM = createHTML('<div class="js-slider-button"></div>', parent);
    this.handleButtonMousedown = this.move.bind(this);
  } // constructor

  move(evt) {
    const { page, offsetFrom, offsetSize, clientSize } = this.pos;
    const { isInvert } = this;

    const btnDOM = evt.target;
    const parent = evt.path[1];
    const basePositionMouse = evt[page];
    const rangeShift = btnDOM[offsetFrom];
    const rangeSize = parent[clientSize] - btnDOM[offsetSize];

    document.onmousemove = (event: MouseEvent) => {
      let newCoord;
      const currentPositionMouse = event[page];
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
  }

  setCoord(coord: number) {
    this.coord = coord;
  }

  toPosition() {
    this.DOM.setAttribute('style', `${this.pos.offset} : ${this.coord}px`);
  }
} // class

export default Button;
