import { Observable } from '../util/observable'
import { roundToMultiple } from '../util/mixins'


class Model {
  Observable = new Observable

  value: number[]
  minValue: number
  maxValue: number
  step: number
  range: boolean

  constructor(config) {
    this.settingData( config )
  } // constructor


  settingData( config ): void {
    this.minValue  =  config.minValue
    this.maxValue  =  config.maxValue
    this.step      =  config.step
    this.range     =  config.range


    // обработка введеных значений для слайдера
    this.setNewValues(config.value)
  }

  // установка значениЙ value по лимитам и шагу
  setNewValues(num: number[]) {
    num = this.checkLimit(num)
    num = this.putInStep(num)

    let result: number[] = []
    if(this.range === true) {
      result.push(Math.min.apply(null, num))
      result.push(Math.max.apply(null, num))
    }
    else result = num
    this.value = result
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
      result.push(value)
    }
    return result
  }

  // обновить значение value по лимитам, шагу и выставить по id
  updateValue(num: number[], id) {
    num = this.checkLimit(num)
    num = this.putInStep(num)

    if(this.range === true) this.value[id] = num[0]
    else this.value = num

    this.Observable.notify({
      value : this.value
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