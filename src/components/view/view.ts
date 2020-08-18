import IConfig from '../interface/IConfig';
import IPositionVars from '../interface/IVarsPosition';
import Range from './range/range';
import Button from './button/button';
import Interval from './interval/interval';
import Label from './label/label';
import Scale from './scale/scale';
import TextField from './textField';

class View {
  range!: Range;
  button: Button[] = [];
  textField: TextField[] = [];
  label: Label[] = [];
  interval?: Interval;
  scale?: Scale;

  pos!: IPositionVars;
  step!: number;
  rangeSize!: number;
  buttonSize!: number;

  constructor(public parent: Element, public defaultConfig: IConfig) {
    this.setPositionVariables();
    this.installComponents();
    this.setValues();
    this.convertValues(this.defaultConfig.sliderValues);
    this.installSubscribesButtons();
    this.setListeners();
  }

  // sets variables for vertical or horizontal positioning
  setPositionVariables() {
    const { isVertical, isInvert } = this.defaultConfig;

    if (isVertical) {
      this.pos = {
        size: 'height',
        offset: isInvert ? 'bottom' : 'top',
        clientSize: 'clientHeight',
        offsetSize: 'offsetHeight',
        page: 'pageY',
        offsetFrom: 'offsetTop',
      };
    } else {
      this.pos = {
        size: 'width',
        offset: isInvert ? 'right' : 'left',
        clientSize: 'clientWidth',
        offsetSize: 'offsetWidth',
        page: 'pageX',
        offsetFrom: 'offsetLeft',
      };
    }
  }

  // creates elements DOM
  installComponents() {
    const {
      isRange,
      isInvert,
      isVertical,
      isLabel,
      isLabelOnClick,
      isScale,
      textField,
    } = this.defaultConfig;

    this.range = new Range();
    this.range.setClassPosition(isVertical);

    // creates buttons
    this.button = [];
    const buttonArrayLength = Number(isRange) + 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.range.DOM, this.pos, i, isInvert);
    }

    // creates spacing between buttons
    if (isRange) {
      this.interval = new Interval(this.range.DOM, this.pos);
    }

    // creates labels above buttons
    if (isLabel) {
      this.label = [];
      this.button.forEach((element, i) => {
        this.label[i] = new Label(this.range.DOM, isLabelOnClick, this.pos.offset);
      });
    }

    // creates scale
    if (isScale) {
      this.scale = new Scale(this.range.DOM, this.defaultConfig);
    }

    //
    if (textField) {
      textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
      });
    }

    // insert slider in Page
    this.parent.append(this.range.DOM);

    // require this.rangeSize for setScale values
    // require this.buttonSize for setButtonValue values
    this.updateRangeSize();

    if (this.interval) {
      this.interval.setButtonValue(this.buttonSize);
    }

    if (this.scale) {
      this.scale.setScale(this.rangeSize);
    }
  }

  // sets values for this.rangeSize и this.step
  // will use 'setValues' and 'handleWindowResize'
  updateRangeSize() {
    const { minValue, maxValue } = this.defaultConfig;

    this.buttonSize = this.button[0].DOM[this.pos.offsetSize];
    this.rangeSize = this.range.DOM[this.pos.clientSize] - this.buttonSize;

    const valueRange = Math.abs(maxValue - minValue);
    this.step = this.rangeSize / valueRange;
  }

  // sets element values
  setValues() {
    const { sliderValues } = this.defaultConfig;

    if (this.textField) {
      this.textField.forEach((element, i) => {
        element.setValue(sliderValues[i]);
      });
    }

    if (this.label) {
      this.label.forEach((element, i) => {
        element.setValue(sliderValues[i]);
      });
    }
  }

  // updates coordinates and set items to position
  convertValues(sliderValues: number[]) {
    const { minValue, isRange, isLabel, isInvert } = this.defaultConfig;

    if (isRange === true) {
      sliderValues.forEach((num, i) => {
        const newCoord = this.step * (num + Math.abs(minValue));
        this.button[i].setCoord(newCoord);
      });

      // sets interval to position
      if (this.interval) {
        const buttonsCoord = this.button.map((elem) => elem.coord);
        this.interval.setBaseCoords(buttonsCoord);
      }
    } else {
      const newCoord = this.step * (sliderValues[0] + Math.abs(minValue));
      this.button[0].setCoord(newCoord);
    }

    // sets label to position
    if (isLabel) {
      this.label.forEach((element, i) => {
        let coord: number;

        if (isInvert) {
          coord = this.button[i].coord + this.button[i].DOM[this.pos.offsetSize];
        } else coord = this.button[i].coord;

        element.setCoord(coord);
      });
    }

    this.toPositionElements();
  }

  toPositionElements() {
    // button
    this.button.forEach((elem) => elem.toPosition());

    // interval
    if (this.interval) {
      this.interval.toPosition();
    }

    // label
    if (this.label) {
      this.label.forEach((elem) => elem.toPosition());
    }
  }

  installSubscribesButtons() {
    this.button.forEach((elem) => {
      elem.Observable.subscribe((options: { coord: number; index: number }) => {
        const { coord, index } = options;

        // button
        this.button[index].setCoord(coord);
        this.button[index].toPosition();

        // interval
        if (this.interval) {
          this.interval.setCoord(coord, index);
          this.interval.toPosition();
        }

        // label
        if (this.label) {
          this.label[index].setCoord(coord);
          this.label[index].toPosition();
        }
      });
    });
  }

  setListeners() {
    const { sliderValues, isLabel, isLabelOnClick } = this.defaultConfig;
    //

    // auto update when the screen width changes
    window.addEventListener('resize', this.handleWindowResize.bind(this, sliderValues));

    // buttons move handler
    this.button.forEach((btn) => {
      btn.DOM.addEventListener('mousedown', btn.handleButtonMousedown.bind(btn));
    });

    // entering values into a text field
    this.textField.forEach((elem) => {
      if (elem.DOM) {
        elem.DOM.addEventListener('blur', elem.handleTextFieldBlur.bind(elem));
      }
    });

    // handler for click on points
    if (this.scale) {
      this.scale.points.forEach((element, i) => {
        element.DOM.addEventListener(
          'click',
          this.scale.handleScalePointClick.bind(this.scale, this.button, i)
        );
      });
    }

    // show/hide label on click
    if (isLabel && isLabelOnClick) {
      this.label.forEach((elem, i) => {
        elem.hide();
        this.button[i].DOM.addEventListener('mousedown', elem.show.bind(elem));
        document.addEventListener('mouseup', elem.hide.bind(elem));
      });
    }
  }

  // update range size and set items to position (this.updateRangeSize, this.convertValues)
  handleWindowResize(sliderValues: number[]) {
    this.updateRangeSize();
    this.convertValues(sliderValues);
    this.toPositionElements();
  }
} // class View

export default View;
