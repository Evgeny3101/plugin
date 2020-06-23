import {Observable} from '../util/observable'

class Controller {
  Observable = new Observable();

  constructor(model, view) {
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
    // перемещение бегунка
    for(let elem of view.button) {
      elem.DOM.addEventListener('mousedown',  elem.move.bind(elem))
    }
    // установка значений в input
    for(let i = 0; i < view.textFieldDOM.length; i++) {
      if(view.textFieldDOM[i]) {
        setTimeout( (() => {
          view.textFieldDOM[i].addEventListener('keyup', () => this.toInputValues(model, view, i) )
        }), 250)
      }
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
    // установка интервала по координатам
    if(model.range) view.updateInterval()
  }

  setBtn(model, view) {
    // установка  кнопок
    view.setBtn({
      range : model.range
    })
    // установка  интервала
    if(model.range) view.setInterval()

    // установка слушателей
    this.init(model, view)
    // подписка на кнопки (здесь, чтобы работать при вызове api.dataset ())
    for(let elem of view.button) {
      elem.Observable.subscribe(function (data) {
        data.step = view.step
        data.id = view.button.indexOf(data.elem)
        model.convertCoords(data)
      })
    }
  }

  // установка значений в input
  toInputValues(model, view, id) {
    let newValue = [Number(view.textFieldDOM[id].value) || 0]
    newValue = model.checkLimit(newValue)
    newValue = model.putInStep(newValue, model.step)

    if(model.range === true) {
      let newArrValue = model.value
      newArrValue[id] = newValue[0]
      model.setSliderValue(newArrValue)
    } else model.value = newValue

    this.update(model, view)
  }
}





export {Controller}