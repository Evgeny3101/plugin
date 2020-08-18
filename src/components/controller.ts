import Model from './model';
import View from './view/view';

class Controller {
  constructor(public model: Model, public view: View) {
    this.installSubscribes();
  }

  installSubscribes() {
    ///  notify Model  ///
    // methods model.convertCoords or model.updateValue
    // when the model.value changes
    this.model.Observable.subscribe((options: { value: number[] }) => {
      const { value } = options;

      this.view.convertValues(value);

      this.view.textField.forEach((element, i) => {
        element.setValue(value[i]);
      });

      this.view.label.forEach((element, i) => {
        element.setValue(value[i]);
      });
    });

    ///  notify View ///
    // method textField[].toInputValues
    // entering values into a text field
    this.view.textField.forEach((elem) => {
      elem.Observable.subscribe((options: { value: number; index: number }) => {
        const { value, index } = options;

        this.model.updateValue(value, index);
      });
    });

    // method button[].move
    // buttons move handler
    this.view.button.forEach((elem) => {
      elem.Observable.subscribe((options: { coord: number; index: number }) => {
        const { coord, index } = options;

        this.model.convertCoords({
          coord,
          index,
          stepInCoord: this.view.step,
        });
      });
    });

    // method  scale.pressScaleBar
    // handler for click on points
    if (this.view.scale) {
      this.view.scale.Observable.subscribe(
        (options: { value: number; index: number }) => {
          const { value, index } = options;
          this.model.updateValue(value, index);
        }
      );
    }
  } // installSubscribes
} // class

export default Controller;
