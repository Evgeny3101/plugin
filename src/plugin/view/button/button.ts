import { createHTML } from '../../utils/mixins';
import Observable from '../../utils/observable';
import IVarsPosition from '../../interface/IVarsPosition';
 
class Button {
  Observable = new Observable();
  coord!: number;
  DOM: HTMLElement;
  parentDOM!: HTMLElement;
  rangeShift!: number;
  rangeSize!: number;
  basePosition!: number;

  constructor(public position: IVarsPosition, public isInvert: boolean) {
    this.DOM = createHTML('<div class="rs-range-slider__button"></div>');
  } 

  handleButtonMousedown = (evt: MouseEvent): boolean => {
    const { page } = this.position;

    this.basePosition = evt[page];
    this.setOptions();

    document.addEventListener('mousemove', this.handleButtonMove);
    document.addEventListener('mouseup', this.handleButtonMouseup);

    return false;
  };

  handleButtonMove = (evt: MouseEvent) => { 
    const { page } = this.position;
    const currentPosition: number = evt[page];

    this.move(currentPosition);
  };

  handleButtonMouseup = () => { 
    this.Observable.notify({
      isMouseDown: false,
    });

    document.removeEventListener('mousemove', this.handleButtonMove);
    document.removeEventListener('mouseup', this.handleButtonMouseup);
  };

  handleButtonTouchstart = (evt: TouchEvent) => {
    const { page } = this.position;
    
    this.basePosition = evt.targetTouches[0][page];
    this.setOptions();

    document.addEventListener('touchend', this.handleButtonTouchend);

    evt.preventDefault();
  };

  handleButtonTouchmove = (evt: TouchEvent) => {
    const currentPosition: number = evt.changedTouches[0][this.position.page];
    this.move(currentPosition);
  };
  
  handleButtonTouchend = () => {
    this.Observable.notify({
      isMouseDown: false,
    });

    document.removeEventListener('touchend', this.handleButtonTouchend);

  };

  setCoord(coord: number) {
    this.coord = coord;
  }

  toPosition() {
    this.DOM.setAttribute('style', `${this.position.offset} : ${this.coord}px`);
  }

  private move(currentPosition: number) {
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

  private setOptions() {
    const { DOM } = this;
    const { offsetFrom, offsetSize, clientSize } = this.position;

    this.parentDOM = DOM.parentElement!;
    this.rangeShift = DOM[offsetFrom];
    this.rangeSize = this.parentDOM[clientSize] - DOM[offsetSize];
  }
} 

export default Button;
