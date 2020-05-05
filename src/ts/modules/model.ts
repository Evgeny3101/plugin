import Observable from './observable'
import {roundToMultiple, countsDecimalPlaces} from '../util/mixins'


export default class Model {
  Observable = new Observable
  minValue: number
  maxValue: number
  step: number
  decimalPlaces: number

  range: boolean
  verticalPos: boolean
  lable: boolean

  textField: number[]
  sliderValue: number[]

  constructor(dataset) {
    this.minValue = dataset.minValue  ||  0
    this.maxValue = dataset.maxValue  ||  100

    this.range        =  dataset.range        ||  false
    this.verticalPos  =  dataset.verticalPos  ||  false
    this.lable        =  dataset.lable        ||  false

    // установка шага
    this.setStep(dataset.step)

    // обработка введеных значений для sliderValue
    this.sliderValue =  [];
    if(this.range === true) {
      this.sliderValue[0] = Math.min.apply(null, dataset.value)
      this.sliderValue[1] = Math.max.apply(null, dataset.value)
    } else {
      if(typeof dataset.value  === 'number') this.sliderValue[0] = dataset.value;
      else if (typeof dataset.value  === 'object') this.sliderValue[0] = dataset.value[0];
      else this.sliderValue[0] = 50
    }
    this.sliderValue = this.checkLimit(this.sliderValue)
  } // constructor

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

  // установка нового step и перерасчет знаков после запятой
  setStep(step: number) {
    this.step          = step ||  1
    this.decimalPlaces = countsDecimalPlaces(this.step)
  }

  // выставляет на ближайший step
  putInStep(num: number[], step: number):number[] {
    let result: number[] = []
    for(let item of num) {
      result.push(roundToMultiple(item, step))
    }
    return result
  }

  // установка значений sliderValue по лимитам и шагу
  setSliderValue(data: number[]) {
    let result: number[] = []
    result.push(Math.min.apply(null, data))
    result.push(Math.max.apply(null, data))
    result = this.checkLimit(result)
    result = this.putInStep(result, this.step)

    return result
  }

} // Model







