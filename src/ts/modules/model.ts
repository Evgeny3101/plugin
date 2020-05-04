import Observable from './observable'
import {roundToMultiple, countsDecimalPlaces} from '../util/mixins'


export default class Model {
  Observable = new Observable
  range: boolean
  sliderValue: number[]

  constructor(dataset) {
    this.range = dataset.range || false

    this.sliderValue =  [];
    if(this.range === true) {
      this.sliderValue[0] = Math.min.apply(null, dataset.value);
      this.sliderValue[1] = Math.max.apply(null, dataset.value);
    }
    else {
      if(typeof dataset.value  === 'number') this.sliderValue[0] = dataset.value
      else if(typeof dataset.value === 'object') {
        this.sliderValue[0] = dataset.value[0] || [50];
      }
    }


  } // constructor
} // Model







