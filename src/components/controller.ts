import Model from './model';
import View from './view/view';

class Controller {
  isMouseDown: boolean = false;
  constructor(public model: Model, public view: View) {
    this.installSubscribes();
  }

  private installSubscribes() {
    ///  notify Model  ///
    this.subscribeToChangeValue();

    ///  notify View ///
    this.subscribeButtons();
    this.subscribeTextField();
    this.subscribeScale();
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
  subscribeScale() {
    if (this.view.scale)
      this.view.scale.Observable.subscribe(
        (options: { value: number; index: number }) => {
          const { value, index } = options;
          this.model.updateValue(value, index);
        }
      );
  }
} // class

export default Controller;