import { roundToMultiple } from '../ts/mixins';
import Observable from '../ts/observable';
import IConfig from './interface/IConfig';

class Model {
  Observable: Observable = new Observable();

  constructor(public config: IConfig) {
    const { sliderValues } = this.config;

    this.setNewValues(sliderValues);
  } // constructor

  convertCoords(options: { buttonsCoords: number[]; stepInCoord: number }) {
    const { buttonsCoords, stepInCoord } = options;
    const { minValue } = this.config;

    const newValues: number[] = buttonsCoords.map(
      (coord) => coord / stepInCoord + minValue
    );

    this.setNewValues(newValues);
  }

  // Обновит значение слайдера по id
  updateValue(number: number, index: number) {
    const values = this.config.sliderValues;
    values[index] = number;

    this.setNewValues(values);
  }

  // Устанавливает новые значения
  private setNewValues(values: number[]) {
    const { isRange } = this.config;

    let newValues: number[] = [];
    if (isRange) {
      newValues.push(Math.min.apply(null, values));
      newValues.push(Math.max.apply(null, values));
    } else newValues = values;

    newValues = this.checkLimit(newValues);
    newValues = this.putInStep(newValues);

    this.config.sliderValues = newValues;

    this.Observable.notify({
      value: newValues,
    });
  }

  // Проверяет значения по лимитам
  private checkLimit(numbersArr: number[]): number[] {
    const { minValue, maxValue } = this.config;

    const result: number[] = [];
    numbersArr.forEach((number) => {
      if (number < minValue) result.push(minValue);
      else if (number > maxValue) result.push(maxValue);
      else result.push(number);
    });
    return result;
  }

  // Округляет значение по шагу
  private putInStep(numbersArr: number[]): number[] {
    const { maxValue, step } = this.config;
    const roundValuesArr: number[] = [];

    numbersArr.forEach((number, i) => {
      const roundValue = roundToMultiple(number, step);
      const isOverLimit = number + step > maxValue;
      roundValuesArr[i] = isOverLimit ? maxValue : roundValue;
    });

    return roundValuesArr;
  }
} // Model

export default Model;
