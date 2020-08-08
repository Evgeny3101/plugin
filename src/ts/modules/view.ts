import IConfig from './interface/IConfig';
import IPositionVars from './interface/IVarsPosition';
import Range from './view/range';
import Button from './view/button';
import Interval from './view/interval';
import Label from './view/label';
import Scale from './view/scale';
import TextField from './view/textField';

class View {
  button: Button[] = [];
  label: Label[] = [];
  textField: TextField[] = [];
  pos!: IPositionVars;
  interval: Interval;
  scale: Scale;
  range: Range;
  rangeSize!: number;
  step!: number;
  mainDOM: Element;

  constructor(parent: Element, config: IConfig) {
    this.mainDOM = parent;

    this.setPositionVariables(config.isVertical, config.isInvert);
    this.createDOM(config);
    this.setValues(config);
    this.setListeners(config);
  }

  // creates elements DOM
  createDOM(config: IConfig) {
    this.range = new Range();
    this.range.setClassPosition(config.isVertical);

    // creates buttons
    this.button = [];
    const buttonArrayLength = Number(config.isRange) + 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.range.DOM, this.pos, i);
    }

    // creates spacing between buttons
    if (config.isRange) {
      this.interval = new Interval(this.range.DOM);
    }

    // creates labels above buttons
    if (config.isLabel) {
      this.label = [];
      this.button.forEach((element, i) => {
        this.label[i] = new Label(this.range.DOM, config.isLabelOnClick);
        this.label[i].input.value = String(config.sliderValues[i]);
      });
    }

    // creates scale
    if (config.isScale) {
      this.scale = new Scale(this.range.DOM, config);
    }

    this.range.appendInDOM(this.mainDOM);
  }

  // sets element values
  setValues(config: IConfig) {
    if (config.isRange) {
      const buttonSize = this.button[0].DOM[this.pos.offsetSize];
      this.interval.setInterval(buttonSize, this.pos);
    }

    if (config.textField) {
      config.textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
        this.textField[i].setValue(config.sliderValues);
      });
    }

    // require  this.rangeSize for setScale values
    this.updateRangeSize(config.maxValue, config.minValue);

    if (config.isScale) {
      this.scale.setScale(this.rangeSize, config);
    }

    this.updateCoords({
      isRange: config.isRange,
      isLabel: config.isLabel,
      minValue: config.minValue,
      sliderValues: config.sliderValues,
    });
  }

  // sets variables for vertical or horizontal positioning
  setPositionVariables(isVertical: boolean, isInvert: boolean) {
    if (isVertical) {
      this.pos = {
        isVertical,
        isInvert,
        size: 'height',
        offset: isInvert ? 'bottom' : 'top',
        clientSize: 'clientHeight',
        offsetSize: 'offsetHeight',
        page: 'pageY',
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        isVertical,
        isInvert,
        size: 'width',
        offset: isInvert ? 'right' : 'left',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        page: 'pageX',
        offsetFrom: 'offsetLeft',
      };
    }
  }

  setListeners(config: IConfig) {
    // auto update when the screen width changes
    window.addEventListener('resize', this.updateSize.bind(this, config));

    // buttons move handler
    this.button.forEach((btn) =>
      btn.DOM.addEventListener('mousedown', btn.move.bind(btn))
    );

    // entering values into a text field
    this.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.addEventListener('blur', elem.getEnteredValues.bind(elem));
      }
    });

    // handler for click on points
    if (this.scale) {
      this.scale.points.forEach((element, i) => {
        const buttonsCoords = this.button.map((button) => button.coord);

        element.DOM.addEventListener(
          'click',
          this.scale.pressScaleBar.bind(this.scale, buttonsCoords, i)
        );
      });
    }

    // show/hide label on click
    if (config.isLabel && config.isLabelOnClick) {
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
  updateCoords(options: {
    isRange: boolean;
    isLabel: boolean;
    minValue: number;
    sliderValues: number[];
  }) {
    const { isRange, isLabel, minValue, sliderValues } = options;
    if (isRange === true) {
      sliderValues.forEach((num, i) => {
        const newCoord = this.step * (num + Math.abs(minValue));
        this.button[i].toPosition(newCoord);
      });

      // sets interval to position
      this.interval.toPosition([this.button[0].coord, this.button[1].coord]);
    } else {
      const newCoord = this.step * (sliderValues[0] + Math.abs(minValue));
      this.button[0].toPosition(newCoord);
    }

    // sets label to position
    if (isLabel) {
      this.label.forEach((element, i) => {
        let coord: number;

        if (this.pos.isInvert) {
          coord = this.button[i].coord + this.button[i].DOM[this.pos.offsetSize];
        } else coord = this.button[i].coord;

        element.toPosition(coord, this.pos.offset);
        element.setValue(sliderValues[i]);
      });
    }
  }

  // update range size and set items to position (this.updateRangeSize, this.updateCoords)
  updateSize(config: IConfig) {
    const { maxValue, minValue, range, label, value } = config;
    this.updateRangeSize(config.maxValue, config.minValue);

    this.updateCoords({
      isRange: config.isRange,
      isLabel: config.isLabel,
      minValue: config.minValue,
      sliderValues: config.sliderValues,
    });
  }
} // class View

export default View;
