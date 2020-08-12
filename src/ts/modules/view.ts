import IConfig from './interface/IConfig';
import IPositionVars from './interface/IVarsPosition';
import Range from './view/range';
import Button from './view/button';
import Interval from './view/interval';
import Label from './view/label';
import Scale from './view/scale';
import TextField from './view/textField';

class View {
  range!: Range;
  button: Button[] = [];
  textField: TextField[] = [];
  label: Label[] = [];
  interval?: Interval;
  scale?: Scale;
  pos!: IPositionVars;
  rangeSize!: number;
  step!: number;

  isRange: boolean;
  isInvert: boolean;
  isVertical: boolean;
  isScale: boolean;
  isLabel: boolean;
  isLabelOnClick: boolean;

  constructor(public parent: Element, config: IConfig) {
    const { isRange, isInvert, isVertical, isScale, isLabel, isLabelOnClick } = config;

    this.isRange = isRange;
    this.isInvert = isInvert;
    this.isVertical = isVertical;
    this.isScale = isScale;
    this.isLabel = isLabel;
    this.isLabelOnClick = isLabelOnClick;

    this.setPositionVariables();
    this.createDOM(config);
    this.setValues(config);
    this.setListeners(config);
  }

  // creates elements DOM
  createDOM(config: IConfig) {
    const { sliderValues, points, numberForEach, longForEach } = config;
    this.range = new Range();
    this.range.setClassPosition(this.isVertical);

    // creates buttons
    this.button = [];
    const buttonArrayLength = Number(this.isRange) + 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.range.DOM, this.pos, i, this.isInvert);
    }

    // creates spacing between buttons
    if (this.isRange) {
      this.interval = new Interval(this.range.DOM, this.pos);
    }

    // creates labels above buttons
    if (this.isLabel) {
      this.label = [];
      this.button.forEach((element, i) => {
        this.label[i] = new Label(this.range.DOM, this.isLabelOnClick);
        this.label[i].input.value = String(sliderValues[i]);
      });
    }

    // creates scale
    if (this.isScale) {
      this.scale = new Scale(this.range.DOM, {
        points,
        numberForEach,
        longForEach,
      });
    }

    this.parent.append(this.range.DOM);
  }

  // sets element values
  setValues(config: IConfig) {
    const { sliderValues, minValue, maxValue, textField } = config;
    //

    if (this.interval) {
      const buttonSize = this.button[0].DOM[this.pos.offsetSize];
      this.interval.setButtonSize(buttonSize);
    }

    if (textField) {
      textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
        this.textField[i].setValue(sliderValues);
      });
    }

    // require  this.rangeSize for setScale values
    this.updateRangeSize(maxValue, minValue);

    if (this.scale) {
      this.scale.setScale(this.rangeSize, config);
    }

    this.updateCoords(minValue, sliderValues);
  }

  // sets variables for vertical or horizontal positioning
  setPositionVariables() {
    if (this.isVertical) {
      this.pos = {
        size: 'height',
        offset: this.isInvert ? 'bottom' : 'top',
        clientSize: 'clientHeight',
        offsetSize: 'offsetHeight',
        page: 'pageY',
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        size: 'width',
        offset: this.isInvert ? 'right' : 'left',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        page: 'pageX',
        offsetFrom: 'offsetLeft',
      };
    }
  }

  setListeners(config: IConfig) {
    const { maxValue, minValue, sliderValues } = config;
    //

    // auto update when the screen width changes
    window.addEventListener(
      'resize',
      this.updateSize.bind(this, maxValue, minValue, sliderValues)
    );

    // buttons move handler
    this.button.forEach((btn) =>
      btn.DOM.addEventListener('mousedown', btn.move.bind(btn))
    );

    // entering values into a text field
    this.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.addEventListener('blur', elem.getFieldValues.bind(elem));
      }
    });

    // handler for click on points
    if (this.scale) {
      const buttonsCoords = this.button.map((button) => button.coord);

      this.scale.points.forEach((element, i) => {
        element.DOM.addEventListener(
          'click',
          this.scale.pressScaleBar.bind(this.scale, buttonsCoords, i)
        );
      });
    }

    // show/hide label on click
    if (this.isLabel && this.isLabelOnClick) {
      this.label.forEach((elem, i) => {
        elem.hide();
        this.button[i].DOM.addEventListener('mousedown', elem.show.bind(elem));
        document.addEventListener('mouseup', elem.hide.bind(elem));
      });
    }
  }

  // sets values for this.rangeSize и this.step
  updateRangeSize(minValue: number, maxValue: number) {
    const btn = this.button[0];
    this.rangeSize = this.range.DOM[this.pos.clientSize] - btn.DOM[this.pos.offsetSize];

    const valueRange = Math.abs(maxValue - minValue);
    this.step = this.rangeSize / valueRange;
  }

  // updates coordinates and set items to position
  updateCoords(minValue: number, sliderValues: number[]) {
    if (this.isRange === true) {
      sliderValues.forEach((num, i) => {
        const newCoord = this.step * (num + Math.abs(minValue));
        this.button[i].toPosition(newCoord);
      });

      // sets interval to position
      if (this.interval)
        this.interval.toPosition([this.button[0].coord, this.button[1].coord]);
    } else {
      const newCoord = this.step * (sliderValues[0] + Math.abs(minValue));
      this.button[0].toPosition(newCoord);
    }

    // sets label to position
    if (this.isLabel) {
      this.label.forEach((element, i) => {
        let coord: number;

        if (this.isInvert) {
          coord = this.button[i].coord + this.button[i].DOM[this.pos.offsetSize];
        } else coord = this.button[i].coord;

        element.toPosition(coord, this.pos.offset);
        element.setValue(sliderValues[i]);
      });
    }
  }

  // update range size and set items to position (this.updateRangeSize, this.updateCoords)
  updateSize(maxValue: number, minValue: number, sliderValues: number[]) {
    this.updateRangeSize(maxValue, minValue);
    this.updateCoords(minValue, sliderValues);
  }
} // class View

export default View;
