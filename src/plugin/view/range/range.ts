import { createHTML } from '../../utils/mixins';
import Observable from '../../utils/observable';
import IVarsPosition from '../../interface/IVarsPosition';

class Range {
  Observable = new Observable();
  DOM: HTMLElement;
  lineDOM: HTMLElement;
  buttonSize!: number;
  borderSize!: number;

  constructor(public pos: IVarsPosition, public isInvert: boolean) {
    this.DOM = createHTML('<div class="rs-range-slider"></div>');
    this.lineDOM = createHTML('<div class="rs-range-slider__line"></div>');
    this.DOM.appendChild(this.lineDOM);
  }

  // устанавливает класс (CSS), отвечающий за положение диапазона
  setClassPosition(isVertical: boolean) {
    if (isVertical) this.DOM.classList.add('rs-range-slider_position_vertical');
    else this.DOM.classList.add('rs-range-slider_position_horizontal');
  }

  setOptions(buttonSize: number) {
    this.buttonSize = buttonSize;
    this.borderSize = parseInt(getComputedStyle(this.lineDOM).border, 10);
  }

  handleRangeClick = (e: MouseEvent) => {
    const { offsetCoord, offsetSize } = this.pos;
    let clickPosition ;
    
    if(this.isInvert) {
      clickPosition = this.DOM[offsetSize] - (e[offsetCoord] + (this.buttonSize / 2 + this.borderSize));
    } else clickPosition = e[offsetCoord] - (this.buttonSize / 2 - this.borderSize);

    this.Observable.notify(
      clickPosition
    );
  };
}

export default Range;
