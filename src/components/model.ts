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
  setNewValues(values: number[]) {
    const { isRange } = this.defaultConfig;

    let newValues: number[] = [];
    if (isRange === true) {
      newValues.push(Math.min.apply(null, values));
      newValues.push(Math.max.apply(null, values));
    } else newValues = values;

    newValues = this.checkLimit(newValues);
    newValues = this.putInStep(newValues);

    this.value = newValues;

    this.Observable.notify({
      value: this.value,
    });
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

  // convert coords into value
  convertCoords(options: { buttonsCoords: number[]; stepInCoord: number }) {
    const { buttonsCoords, stepInCoord } = options;
    const { minValue } = this.defaultConfig;

    const newValues: number[] = buttonsCoords.map(
      (coord) => coord / stepInCoord + minValue
    );

    this.setNewValues(newValues);
  }

  // update value by id
  updateValue(number: number, index: number) {
    this.value[index] = number;
    this.setNewValues(this.value);
  }
} // Model

export default Model;
