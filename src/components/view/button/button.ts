import { createHTML } from '../../../ts/mixins';
import Observable from '../../../ts/observable';
import IVarsPosition from '../../interface/IVarsPosition';
 
class Button {
  Observable = new Observable();
  coord!: number;
  DOM: HTMLElement;
  parentDOM!: HTMLElement;
  rangeShift!: number;
  rangeSize!: number;
  basePosition!: number;

  constructor(public pos: IVarsPosition, public isInvert: boolean) {
    this.DOM = createHTML('<div class="rs-range-slider__button"></div>');
  } // constructor

  handleButtonMousedown = (evt: MouseEvent): boolean => {
    const { page } = this.pos;

    this.basePosition = evt[page];
    this.setOptions();

    document.onmousemove = (event: MouseEvent) => {
      const currentPosition: number = event[page];
      
      this.move(currentPosition);
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

  handleButtonTouchstart = (evt: TouchEvent) => {
    const { page } = this.pos;
    
    this.basePosition = evt.targetTouches[0][page];
    this.setOptions();

    document.ontouchend = () => {
      this.Observable.notify({
        isMouseDown: false,
      });

      document.ontouchend = null;
    };

    evt.preventDefault();
  };

  handleButtonTouchmove = (evt: TouchEvent) => {
    const currentPosition: number = evt.changedTouches[0][this.pos.page];
    this.move(currentPosition);
  };

  handleButtonTouchend = () => {
    this.Observable.notify({
      isMouseDown: false,
    });
  };

  move(currentPosition: number) {
    const { basePosition, rangeSize, rangeShift, isInvert } = this;
    let newCoord;
    
    if (isInvert) {
      newCoord = basePosition - currentPosition + (rangeSize - rangeShift);
    } else {
      newCoord = rangeShift - (basePosition - currentPosition);
    }

    // limit coords
    if (newCoord < 0) newCoord = 0;
    if (newCoord > rangeSize) newCoord = rangeSize;

    this.setCoord(newCoord);

    this.Observable.notify({
      isMouseDown: true,
    });
  }

  setCoord(coord: number) {
    this.coord = coord;
  }

  toPosition() {
    this.DOM.setAttribute('style', `${this.pos.offset} : ${this.coord}px`);
  }

  private setOptions() {
    const { DOM } = this;
    const { offsetFrom, offsetSize, clientSize } = this.pos;

    this.parentDOM = DOM.parentElement!;
    this.rangeShift = DOM[offsetFrom];
    this.rangeSize = this.parentDOM[clientSize] - DOM[offsetSize];
  }
} // class

export default Button;
