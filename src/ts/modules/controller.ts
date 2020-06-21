import {Observable} from '../util/observable'

class Controller {
  Observable = new Observable();

  constructor(model, view) {
    let self = this

    // установка значений в полях и кнопок по координатам
    view.setTextField(model.textField, model.value)
    this.setBtn(model, view)
    this.update(model, view)

    //// подписки
    // при изменении model.value с помощью метода convertCoords
    model.Observable.subscribe(function (data) {
      data.minValue = model.minValue
      data.range = model.range

      view.updateCoords(data)
      view.updateTextField(data.value)
    })

  }

  //// установка слушателей
  init(model, view) {
    for(let elem of view.button) {
      elem.DOM.addEventListener('mousedown',  elem.move.bind(elem))
    }
  }

  // обновление значений в полях и кнопок по координатам
  update(model, view) {
    view.updateTextField(model.value)
    view.convertValues({
      minValue  : model.minValue,
      maxValue  : model.maxValue,
      value     : model.value
    })
  }

  // установка кнопок
  setBtn(model, view) {
    view.setBtn({
      range : model.range
    })

    // установка слушателей
    this.init(model, view)
    // подписка на кнопки (здесь, чтобы работать при вызове api.dataset ())
    for(let elem of view.button) {
      elem.Observable.subscribe(function (data) {
        data.stepSize = view.stepSize
        data.id = view.button.indexOf(data.elem)
        model.convertCoords(data)
      })
    }
  }
}





export {Controller}