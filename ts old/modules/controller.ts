import {Observable} from '../util/observable'
import { Model } from './model';
import { View } from './view';

class Controller {
  Observable = new Observable();

  constructor(model: Model, view: View) {
    this.init(model, view)
    this.update(model, view)

    //// слушатели
    // автоматическое обновление при изменении ширины экрана
    window.addEventListener('resize', () => this.update(model, view) )

    //// подписки
    // при изменении model.value
    // методами model.convertCoords или model.updateValue
    model.Observable.subscribe(function (data) {
      data.minValue = model.minValue
      data.range = model.range
      view.updateCoords(data)
      view.updateTextField(data.value, model.isInvert) //isInvert
    })
  }

  // обновление значений в полях и кнопок по координатам
  update(model, view) {
    view.updateTextField(model.value, model.isInvert) //isInvert
    view.setStepInPx({
      minValue  : model.minValue,
      maxValue  : model.maxValue,
    })
    view.updateCoords({
      range     : model.range,
      minValue  : model.minValue,
      value     : model.value,
    })

    // определить координаты шкалы
    if(model.scale) view.scale.determineСoordScale(view.rangeSize)

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
      value         : model.value,
      onClick       : model.labelOnClick,
      isInvert      : model.isInvert           //isInvert
    })
    // установка текстовых полей
    view.setTextField(model.textField)
    // установка  шкалы
    if(model.scale) view.setScale({
      points        : model.points,
      longForEach   : model.longForEach,
      numberForEach : model.numberForEach,
      minValue      : model.minValue,
      maxValue      : model.maxValue,
      step          : model.step,
      isInvert      : model.isInvert            //isInvert
    })

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
    // клик на деление шкалы
    if(model.scale) {
      for(let i = 0; i < view.scale.points.length; i++) {
        view.scale.points[i].DOM.addEventListener('click', () => view.scale.pressScaleBar(view.button,model.range, i))
      }
    }

    ////////////////////////
    // здесь, чтобы работать при вызове api.dataset ()
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
    if(model.scale) {
      view.scale.Observable.subscribe(function (data) {
        model.updateValue([data.value], data.id)
      })
    }
  }

  // установка значений из text-field
  toInputValues(model, view, id: number) {
    let num = [Number(view.textFieldDOM[id].value) || 0]
    model.updateValue(num, id)
  }

}





export {Controller}