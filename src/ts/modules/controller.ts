import { Observable } from '../util/observable'
import { Model } from './model';
import { View } from './view';

class Controller {
  Observable = new Observable();

  constructor( model: Model, view: View, config ) {
    this.installSubscribes( model, view, config )
  }

  installSubscribes( model: Model, view: View, config ) {
    //// notify Model ////
    // при изменении model.value
    // методами model.convertCoords или model.updateValue
    model.Observable.subscribe(function (data) {
      view.updateCoords({
        value    : data.value,
        minValue : model.minValue,
        range    : model.range,
        label    : config.label,
      })

      for(let i = 0; i < view.textField.length; i++) {
        view.textField[i].updateTextField({
          value : data.value,
          id    : i,
        })
      }
    })


    //// notify View ////
    // установка значений из text-field
    for(let elem of view.textField) {
      elem.Observable.subscribe(function ( data ) {
        model.updateValue(data.num, data.id)
      })
    }

    // по движению кнопки. методом move
    for(let elem of view.button) {
      elem.Observable.subscribe(function (data) {
        data.step = view.step
        data.id = view.button.indexOf(data.elem)
        model.convertCoords(data)
      })
    }

    // при клике на число или деление шкалы
    // методом pressScaleBar
    if(config.scale) {
      view.scale.Observable.subscribe(function (data) {
        model.updateValue([data.value], data.id)
      })
    }
  } // installSubscribes
} // class


export {Controller}