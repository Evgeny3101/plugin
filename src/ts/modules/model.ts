import {Observable} from '../util/observable'
import {roundToMultiple, countsDecimalPlaces} from '../util/mixins'


class Model {
  Observable = new Observable
  minValue: number
  maxValue: number
  step: number
  decimalPlaces: number

  range: boolean
  verticalPos: boolean
  lable: boolean

  textField: string[]
  value: number[]

  constructor(data) {
    this.value       =  [0,0]
    this.minValue    =  0
    this.maxValue    =  100
    this.step        =  1

    this.range       =  false
    this.verticalPos =  false
    this.lable       =  false

    this.textField   =  ['.text-field', 'text-field2']

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
      this.setSliderValue([this.value])
    }
    if(this.range === false)  this.setSliderValue([this.value[0]])
    else                      this.setSliderValue(this.value)

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

  // выставляет на ближайший step
  putInStep(num: number[], step: number):number[] {
    let result: number[] = []
    for(let item of num) {
      result.push(roundToMultiple(item, step))
    }
    return result
  }

  // установка значений value по лимитам и шагу
  setSliderValue(data: number[]) {
    let result: number[] = []
    if(this.range === true) {
      result.push(Math.min.apply(null, data))
      result.push(Math.max.apply(null, data))
    }
    else result = data
    result = this.checkLimit(result)
    result = this.putInStep(result, this.step)

    this.value = result
  }

  // для преобразования координат в значения
  convertCoords(data){
    let newValue = roundToMultiple((data.coord / data.stepSize), this.step) + this.minValue;
    let newArrValue = this.value

    if(this.range === true) {
      newArrValue[data.id] = newValue
      this.setSliderValue(newArrValue)
    }
    else this.value[0] = newValue

    this.Observable.notify({
      value     : this.value,
    })
  }

} // Model


export {Model}