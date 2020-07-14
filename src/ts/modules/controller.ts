/* eslint-disable class-methods-use-this */
import Observable from '../util/observable';
import Model from './model';
import View from './view';
import Button from './view/button';
import Config from './interface/config';
import TextField from './view/textField';

class Controller {
  Observable = new Observable();

  constructor(model: Model, view: View, config: Config) {
    this.installSubscribes(model, view, config);
  }

  installSubscribes(model: Model, view: View, config: Config) {
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

      for (let i = 0; i < view.textField.length; i++) {
        view.textField[i].updateTextField({
          value: data.value,
          id: i,
        });
      }
    });

    /// / notify View ////
    // установка значений из text-field

    view.textField.forEach((elem) => {
      elem.Observable.subscribe((data: { value: number[]; elem: TextField }) => {
        const id = view.textField.indexOf(data.elem);
        model.updateValue(data.value, id);
      });
    });

    // по движению кнопки. методом move
    view.button.forEach((elem) => {
      elem.Observable.subscribe((data: { coord: number; elem: Button }) => {
        model.convertCoords({
          coord: data.coord,
          step: view.step,
          id: view.button.indexOf(data.elem),
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
