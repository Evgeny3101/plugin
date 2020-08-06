/* eslint-disable class-methods-use-this */
import IConfig from './interface/config';
import Model from './model';
import View from './view';

class Controller {
  constructor(model: Model, view: View, config: IConfig) {
    this.installSubscribes(model, view, config);
  }

  installSubscribes(model: Model, view: View, config: IConfig) {
    /// / notify Model ////
    // при изменении model.value
    // методами model.convertCoords или model.updateValue
    model.Observable.subscribe((data: { value: number[] }) => {
      view.updateCoords({
        value: data.value,
        minValue: model.minValue,
        range: model.range,
        label: config.label,
      });

      view.textField.forEach((element) => {
        element.updateTextField(data.value);
      });
    });

    /// / notify View ////

    // установка значений из text-field
    view.textField.forEach((elem) => {
      elem.Observable.subscribe((data: { value: [number]; index: number }) => {
        model.updateValue(data.value, data.index);
      });
    });

    // по движению кнопки. методом move
    view.button.forEach((elem) => {
      elem.Observable.subscribe((data: { coord: number; index: number }) => {
        model.convertCoords({
          coord: data.coord,
          step: view.step,
          id: data.index,
        });
      });
    });

    // при клике на число или деление шкалы
    // методом pressScaleBar
    if (view.scale) {
      view.scale.Observable.subscribe((data: { value: number; id: number }) => {
        model.updateValue([data.value], data.id);
      });
    }
  } // installSubscribes
} // class

export default Controller;
