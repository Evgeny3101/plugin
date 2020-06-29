import {Observable} from '../util/observable'
import {roundToMultiple, countsDecimalPlaces} from '../util/mixins'


class Model {
  Observable = new Observable
  minValue: number
  maxValue: number
  step: number
  decimalPlaces: number

  range: boolean
  vertical: boolean
  lable: boolean

  textField: string[]
  value: number[]

  constructor(data) {
    this.value       =  [0,0]
    this.minValue    =  0
    this.maxValue    =  100
    this.step        =  1

    this.range       =  false
    this.vertical    =  false
    this.lable       =  false

    this.textField   =  []

    this.dataset(data)
  } // constructor


  dataset(data): void {
    for(let key in data) {
      this[key] = data[key]
    }

    // расчет знаков после запятой
    this.decimalPlaces = countsDecimalPlaces(this.step)

    // обработка введеных значений для слайдера
    if(typeof this.value  === 'number' && this.range === false) {
      this.setNewValues([this.value])
    }
    if(this.range === false)  this.setNewValues([this.value[0]])
    else                      this.setNewValues(this.value)

  }

  // проверить значения по  min max
  checkLimit(data:number[]): number[] {
    let result: number[] = []
    for(let item of data) {
      if(item < this.minValue)       result.push(this.minValue)
      else if(item > this.maxValue)  result.push(this.maxValue)
      else result.push(item)
    }
    return result
  }

  // выставляет на ближайший step и обрезает знаки после запятой
  putInStep(num: number[]):number[] {
    let result: number[] = []
    for(let item of num) {
      let value = roundToMultiple(item, this.step)
      value = Number(value.toFixed(this.decimalPlaces))
      result.push(value)
    }
    return result
  }

  // установка значениЙ value по лимитам и шагу
  setNewValues(data: number[]) {
    data = this.checkLimit(data)
    data = this.putInStep(data)

    let result: number[] = []
    if(this.range === true) {
      result.push(Math.min.apply(null, data))
      result.push(Math.max.apply(null, data))
    }
    else result = data
    this.value = result
  }

  // обновить значение value по лимитам, шагу и выставить по id
  updateValue(num: number[], id) {
    num = this.checkLimit(num)
    num = this.putInStep(num)

    if(this.range === true) this.value[id] = num[0]
    else this.value = num

    this.Observable.notify({
      value     : this.value,
    })
  }

  // для преобразования координат в значения
  convertCoords(data){
    let newValue = roundToMultiple((data.coord / data.step), this.step) + this.minValue;
    let newArrValue = this.value

    if(this.range === true) {
      newArrValue[data.id] = newValue
      this.setNewValues(newArrValue)
    }
    else this.value[0] = newValue

    this.Observable.notify({
      value     : this.value,
    })

  }

} // Model


export {Model}