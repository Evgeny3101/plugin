import { roundToMultiple } from '../util/mixins';
import Observable from '../util/observable';
import IConfig from './interface/IConfig';

class Model {
  Observable: Observable = new Observable();
  value!: number[];
  minValue!: number;
  maxValue!: number;
  step!: number;
  isRange!: boolean;

  constructor(config: IConfig) {
    this.settingData(config);
  } // constructor

  settingData(config: IConfig) {
    const { minValue, maxValue, step, isRange, sliderValues } = config;

    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.isRange = isRange;

    // processes entered values
    this.setNewValues(sliderValues);
  }

  // sets new values and processes the entered values by limits and step
  setNewValues(numbersArr: number[]) {
    let newValue: number[] = numbersArr;
    newValue = this.checkLimit(newValue);
    newValue = this.putInStep(newValue);

    let result: number[] = [];
    if (this.isRange === true) {
      result.push(Math.min.apply(null, newValue));
      result.push(Math.max.apply(null, newValue));
    } else result = newValue;
    this.value = result;
  }

  // checks by limits
  checkLimit(numbersArr: number[]): number[] {
    const result: number[] = [];
    numbersArr.forEach((number) => {
      if (number < this.minValue) result.push(this.minValue);
      else if (number > this.maxValue) result.push(this.maxValue);
      else result.push(number);
    });
    return result;
  }

  // put on the nearest step and round to multiple
  putInStep(numbersArr: number[]): number[] {
    const result: number[] = [];
    numbersArr.forEach((number) => {
      const value = roundToMultiple(number, this.step);
      result.push(value);
    });
    return result;
  }

  // update value by id. check by limits and step
  updateValue(number: number, index: number) {
    this.value[index] = number;
    this.setNewValues(this.value);
    const { value } = this;

    this.Observable.notify({
      value,
      minValue: this.minValue,
    });
  }

  // convert coords into value and sets by id
  convertCoords(options: { coord: number; stepInCoord: number; index: number }) {
    const { coord, stepInCoord, index } = options;
    const newValue = roundToMultiple(coord / stepInCoord, this.step) + this.minValue;

    if (this.isRange === true) {
      this.value[index] = newValue;
      this.setNewValues(this.value);
    } else this.setNewValues([newValue]);

    this.Observable.notify({
      value: this.value,
    });
  }
} // Model

export default Model;
