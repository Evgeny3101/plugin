import { roundToMultiple } from '../ts/mixins';
import Observable from '../ts/observable';
import IConfig from './interface/IConfig';

class Model {
  Observable: Observable = new Observable();
  value!: number[];
  step!: number;

  constructor(public defaultConfig: IConfig) {
    const { sliderValues } = this.defaultConfig;

    this.setNewValues(sliderValues);
  } // constructor

  // sets new values and processes the entered values by limits and step
  setNewValues(numbersArr: number[]) {
    const { isRange } = this.defaultConfig;

    let newValue: number[] = numbersArr;
    newValue = this.checkLimit(newValue);
    newValue = this.putInStep(newValue);

    let result: number[] = [];
    if (isRange === true) {
      result.push(Math.min.apply(null, newValue));
      result.push(Math.max.apply(null, newValue));
    } else result = newValue;
    this.value = result;
  }

  // checks by limits
  checkLimit(numbersArr: number[]): number[] {
    const { minValue, maxValue } = this.defaultConfig;

    const result: number[] = [];
    numbersArr.forEach((number) => {
      if (number < minValue) result.push(minValue);
      else if (number > maxValue) result.push(maxValue);
      else result.push(number);
    });
    return result;
  }

  // put on the nearest step and round to multiple
  putInStep(numbersArr: number[]): number[] {
    const { step } = this.defaultConfig;

    const result: number[] = [];
    numbersArr.forEach((number) => {
      const roundValue = roundToMultiple(number, step);
      result.push(roundValue);
    });
    return result;
  }

  // update value by id. check by limits and step
  updateValue(number: number, index: number) {
    const { minValue } = this.defaultConfig;

    this.value[index] = number;
    this.setNewValues(this.value);

    this.Observable.notify({
      value: this.value,
      minValue,
    });
  }

  // convert coords into value and sets by id
  convertCoords(options: { coord: number; stepInCoord: number; index: number }) {
    const { coord, stepInCoord, index } = options;
    const { minValue, isRange, step } = this.defaultConfig;

    const valueFromCoord = coord / stepInCoord;
    const newValue = roundToMultiple(valueFromCoord, step) + minValue;

    if (isRange === true) {
      this.value[index] = newValue;
      this.setNewValues(this.value);
    } else this.setNewValues([newValue]);

    this.Observable.notify({
      value: this.value,
    });
  }
} // Model

export default Model;
