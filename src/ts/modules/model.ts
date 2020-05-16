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
    this.minValue     =  dataset.minValue     ||  0
    this.maxValue     =  dataset.maxValue     ||  100

    this.range        =  dataset.range        ||  false
    this.verticalPos  =  dataset.verticalPos  ||  false
    this.lable        =  dataset.lable        ||  false

    // установка шага
    this.setStep(dataset.step)

    // обработка введеных значений для sliderValue
    this.sliderValue =  [];

    if(typeof dataset.value  === 'number' && this.range === false) {
      this.setSliderValue([dataset.value])
    }
    else if(Array.isArray(dataset.value) === true) {
      this.setSliderValue(dataset.value)
    }
    else this.setSliderValue([50])

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
    if(this.range === true) {
      result.push(Math.min.apply(null, data))
      result.push(Math.max.apply(null, data))
    } else result = data
    result = this.checkLimit(result)
    result = this.putInStep(result, this.step)

    this.sliderValue = result
  }

} // Model







