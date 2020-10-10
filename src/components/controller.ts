import IConfig from './interface/IConfig';
import Model from './model';
import View from './view/view';

class Controller {
  model!: Model;
  view!: View;
  isMouseDown: boolean = false;

  constructor(public mainDOM: Element, public config: IConfig) {
    this.setNewConfig(this.config);
    this.init();

    ///  notify Model  ///
    this.subscribeToChangeValue();

    ///  notify View ///
    this.subscribeButtons();
    this.subscribeTextField();
    this.subscribePoint();
  }

  init() {
    this.model = new Model(this.config);
    // after checking the limits and step
    this.config.sliderValues = this.model.value;

    this.view = new View(this.mainDOM, this.config);
  }

  setNewConfig(options: any) {
    const newConfig = options;
    const { sliderType, value1slider, value2slider } = options;
    if (typeof value1slider === 'number') newConfig.sliderValues[0] = [value1slider];
    if (typeof value2slider === 'number') newConfig.sliderValues[1] = [value2slider];
    if (sliderType) {
      newConfig.isSingle = sliderType === 'single';
      newConfig.isRange = sliderType === 'range';
      newConfig.isProgress = sliderType === 'progress';
    }

    delete newConfig.sliderType;

    this.config = newConfig;
  }

  // methods model.updateValue
  // when the model.value changes
  private subscribeToChangeValue() {
    this.model.Observable.subscribe((options: { value: number[] }) => {
      const { value } = options;
      const { isMouseDown } = this;

      if (isMouseDown === false) {
        this.view.convertValues(value);
        this.view.setCoords();
        this.view.toPositionElements();
      }

      this.view.setValues(value);
    });
  }

  // method button[].move
  // buttons move handler
  private subscribeButtons() {
    this.view.button.forEach((elem) => {
      elem.Observable.subscribe((options: { isMouseDown: boolean }) => {
        const { isMouseDown } = options;
        const { step } = this.view;

        const buttonsCoords = this.view.button.map((btn) => btn.coord);

        this.isMouseDown = isMouseDown;

        if (isMouseDown) {
          this.view.setCoords();
          this.view.toPositionElements();
        }

        this.model.convertCoords({
          buttonsCoords,
          stepInCoord: step,
        });
      });
    });
  }

  // method textField[].toInputValues
  // entering values into a text field
  private subscribeTextField() {
    if (this.view.textField)
      this.view.textField.forEach((elem) => {
        elem.Observable.subscribe((options: { value: number; index: number }) => {
          const { value, index } = options;
          this.model.updateValue(value, index);
        });
      });
  }

  // method scale.pressScaleBar
  // handler for click on points
  private subscribePoint() {
    if (this.view.scale)
      this.view.scale.points.forEach((point) => {
        point.Observable.subscribe((options: { value: number }) => {
          // looking for the nearest button
          const { value } = options;
          const { isRange } = this.config;

          let indexOfRequiredButton;

          if (!isRange) {
            indexOfRequiredButton = 0;
          } else {
            // initial number of buttons is undefined
            // get the current coordinates of the buttons
            const btn1 = this.view.button[0].coord;
            const btn2 = this.view.button[1].coord;

            const range = btn2 - btn1;
            const btn1Diapason = range / 2 + btn1;

            indexOfRequiredButton = point.coord > btn1Diapason ? 1 : 0;
          }

          this.model.updateValue(value, indexOfRequiredButton);
        });
      });
  }
} // class

export default Controller;
