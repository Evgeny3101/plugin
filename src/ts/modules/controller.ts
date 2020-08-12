/* eslint-disable class-methods-use-this */
import Model from './model';
import View from './view';

class Controller {
  constructor(model: Model, view: View) {
    this.installSubscribes(model, view);
  }

  installSubscribes(model: Model, view: View) {
    ///  notify Model  ///
    // methods model.convertCoords или model.updateValue
    // when the model.value changes
    model.Observable.subscribe((options: { value: number[] }) => {
      const { value } = options;

      view.updateCoords(model.minValue, value);

      view.textField.forEach((element) => {
        element.setValue(value);
      });
    });

    ///  notify View ///
    // method textField[].toInputValues
    // entering values into a text field
    view.textField.forEach((elem) => {
      elem.Observable.subscribe((options: { value: number; index: number }) => {
        const { value, index } = options;

        model.updateValue(value, index);
      });
    });

    // method button[].move
    // buttons move handler
    view.button.forEach((elem) => {
      elem.Observable.subscribe((options: { coord: number; index: number }) => {
        const { coord, index } = options;

        model.convertCoords({
          coord,
          index,
          stepInCoord: view.step,
        });
      });
    });

    // method  scale.pressScaleBar
    // handler for click on points
    if (view.scale) {
      view.scale.Observable.subscribe((options: { value: number; index: number }) => {
        const { value, index } = options;
        model.updateValue(value, index);
      });
    }
  } // installSubscribes
} // class

export default Controller;
