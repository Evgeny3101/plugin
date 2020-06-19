import {Observable} from '../util/observable'

class Controller {
  Observable = new Observable();

  constructor(model, view) {
    this.init(model, view)


    view.button[0].Observable.subscribe(function (data) {
      data.stepSize = view.stepSize

      model.convertCoords(data)
    })

    model.Observable.subscribe(function (data) {
      data.minValue = model.minValue
      data.range = model.range

      view.updateCoords(data)
      view.updateTextField(data.value)
    })



  }

  init(model, view) {
    view.setTextField(model.textField, model.value)
    view.convertValues({
      minValue  : model.minValue,
      maxValue  : model.maxValue,
      value     : model.value
    })


    for(let elem of view.button) {
      elem.DOM.addEventListener('mousedown',  elem.move.bind(elem))
    }
  }
}





export {Controller}