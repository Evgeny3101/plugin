import {Observable} from '../util/observable'

class Controller {
  Observable = new Observable();

  constructor(model, view) {
    // установка значений в полях и кнопок по координатам
    this.init(model, view)
    this.update(model, view)

    //// подписки
    // при изменении model.value
    // с помощью: метода convertCoords или updateValue
    model.Observable.subscribe(function (data) {
      data.minValue = model.minValue
      data.range = model.range
      view.updateCoords(data)

      view.updateTextField(data.value)
    })
  }

  // обновление значений в полях и кнопок по координатам
  update(model, view) {
    view.updateTextField(model.value)
    view.setStepInPx({
      minValue  : model.minValue,
      maxValue  : model.maxValue,
    })
    view.updateCoords({
      range     : model.range,
      minValue  : model.minValue,
      value     : model.value,
    })

    // установка интервала по координатам
    if(model.range) view.updateInterval()
  }

  init(model, view) {
    // установка переменных
    view.setPositionVariables(model.vertical)

    ////    установка элементов    ////
    // установка  кнопок
    view.setBtn(model.range)
    // установка  интервала
    if(model.range) view.setInterval()
    // установка  лейблов
    if(model.label) view.setLabel({
      range    : model.range,
      value    : model.value
    })
    // установка текстовых полей
    view.setTextField(model.textField)

    ////    установка слушателей    ////
    // перемещение бегунка
    for(let elem of view.button) {
      elem.DOM.addEventListener('mousedown',  elem.move.bind(elem))
    }
    // установка значений в text-field
    for(let i = 0; i < view.textFieldDOM.length; i++) {
      if(view.textFieldDOM[i]) {
        view.textFieldDOM[i].addEventListener('blur', () => this.toInputValues(model, view, i) )
      }
    }
    // показывать / скрывать лейбл при нажатии
    if(model.label) {
      for(let i = 0; i < view.label.length; i++) {
        view.button[i].DOM.addEventListener('mousedown', view.label[i].show.bind(view.label[i]))
        view.button[i].DOM.addEventListener('mouseup', view.label[i].hide.bind(view.label[i]))
      }
    }


    ////    подписка    ////
    ////////////////////////
    // подписка на кнопки (здесь, чтобы работать при вызове api.dataset ())
    for(let elem of view.button) {
      elem.Observable.subscribe(function (data) {
        data.step = view.step
        data.id = view.button.indexOf(data.elem)
        model.convertCoords(data)
      })
    }
  }

  // установка значений из text-field
  toInputValues(model, view, id) {
    let num = [Number(view.textFieldDOM[id].value) || 0]
    model.updateValue(num, id)
  }

}





export {Controller}