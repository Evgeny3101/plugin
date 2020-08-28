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

  constructor(public parent: Element, public defaultConfig: IConfig) {
    this.setPositionVariables();
    this.installComponents();
    this.setElementsParameters();
    this.setValues();
    this.convertValues();
    this.setCoords();
    this.toPositionElements();
    this.setListeners();
  }

  // sets in elements slider values
  setValues(sliderValues: number[] = this.defaultConfig.sliderValues) {
    this.defaultConfig.sliderValues = sliderValues;

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

  convertValues(sliderValues: number[] = this.defaultConfig.sliderValues) {
    const { minValue, isRange } = this.defaultConfig;

    if (isRange) {
      sliderValues.forEach((num, i) => {
        const newCoord = this.step * (num + Math.abs(minValue));
        this.button[i].setCoord(newCoord);
      });
    } else {
      const newCoord = this.step * (sliderValues[0] + Math.abs(minValue));
      this.button[0].setCoord(newCoord);
    }
  }

  setCoords() {
    const { isLabel, isInvert } = this.defaultConfig;
    const buttonsCoords = this.button.map((elem) => elem.coord);
    const buttonsSizes = this.button.map((elem) => elem.DOM[this.pos.offsetSize]);

    // sets coords for interval
    if (this.interval) this.interval.setBaseCoords(buttonsCoords);

    // sets coords for label
    if (isLabel) {
      this.label.forEach((element, i) => {
        let coords: number;

        if (isInvert) {
          coords = buttonsCoords[i] + buttonsSizes[i];
        } else coords = buttonsCoords[i];

        element.setCoord(coords);
      });
    }
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

  // sets variables for vertical or horizontal positioning
  private setPositionVariables() {
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
  private installComponents() {
    const {
      isRange,
      isProgress,
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

    const buttonArrayLength = isRange ? 2 : 1;
    for (let i = 0; i < buttonArrayLength; i += 1) {
      this.button[i] = new Button(this.range.DOM, this.pos, i, isInvert);
    }

    // creates spacing between buttons
    if (isRange || isProgress) {
      this.interval = new Interval(this.range.DOM, this.pos, isProgress);
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

    // creates classes and finds the text fields
    if (textField) {
      textField.forEach((element, i) => {
        this.textField[i] = new TextField(element, i);
      });
    }

    // insert slider in page
    this.parent.append(this.range.DOM);
  }

  // sets values for this.rangeSize и this.step will use in 'setValues'
  // will use 'setElementsParameters' and 'handleWindowResize'
  private updateRangeSize() {
    const { minValue, maxValue } = this.defaultConfig;

    const buttonSize = this.button[0].DOM[this.pos.offsetSize];
    const rangeSize = this.range.DOM[this.pos.clientSize];

    this.rangeSize = rangeSize - buttonSize;

    const valueRange = Math.abs(maxValue - minValue);
    this.step = this.rangeSize / valueRange;
  }

  // sets parameters of elements
  private setElementsParameters() {
    // require this.rangeSize for setScale values
    this.updateRangeSize();

    if (this.interval) {
      const buttonSize = this.button[0].DOM[this.pos.offsetSize];
      this.interval.setButtonValue(buttonSize);
    }

    if (this.scale) {
      this.scale.setScale(this.rangeSize);
    }
  }

  private setListeners() {
    const { isLabel, isLabelOnClick } = this.defaultConfig;
    //

    // auto update when the screen width changes
    window.addEventListener('resize', this.handleWindowResize.bind(this));

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

  // update range size and set items to position
  private handleWindowResize() {
    this.updateRangeSize();
    this.setValues();
    this.convertValues();
    this.setCoords();
    this.toPositionElements();
  }
} // class View

export default View;
