/* eslint-disable class-methods-use-this */
import IConfig from './interface/IConfig';
import Model from './model';
import View from './view';

class Controller {
  constructor(model: Model, view: View, config: IConfig) {
    this.installSubscribes(model, view, config);
  }

  installSubscribes(model: Model, view: View, config: IConfig) {
    ///  notify Model  ///
    // methods model.convertCoords или model.updateValue
    // when the model.value changes
    model.Observable.subscribe((data: { value: number[] }) => {
      view.updateCoords({
        isRange: model.isRange,
        isLabel: config.isLabel,
        minValue: model.minValue,
        sliderValues: data.value,
      });

      view.textField.forEach((element) => {
        element.setValue(data.value);
      });
    });

    ///  notify View ///
    // method textField[].toInputValues
    // entering values into a text field
    view.textField.forEach((elem) => {
      elem.Observable.subscribe((data: { value: [number]; index: number }) => {
        model.updateValue(data.value, data.index);
      });
    });

    // method button[].move
    // buttons move handler
    view.button.forEach((elem) => {
      elem.Observable.subscribe((data: { coord: number; index: number }) => {
        model.convertCoords({
          coord: data.coord,
          stepInCoord: view.step,
          index: data.index,
        });
      });
    });

    // method  scale.pressScaleBar
    // handler for click on points
    if (view.scale) {
      view.scale.Observable.subscribe((data: { value: number; index: number }) => {
        model.updateValue([data.value], data.index);
      });
    }
  } // installSubscribes
} // class

export default Controller;
