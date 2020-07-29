import roundToMultiple from '../util/mixins';
import Observable from '../util/observable';
import Config from './interface/config';

class Model {
  Observable: Observable = new Observable();
  value!: number[];
  minValue!: number;
  maxValue!: number;
  step!: number;
  range!: boolean;

  constructor(config: Config) {
    this.settingData(config);
  } // constructor

  settingData(config: Config): void {
    this.minValue = config.minValue;
    this.maxValue = config.maxValue;
    this.step = config.step;
    this.range = config.range;

    // обработка введеных значений для слайдера
    this.setNewValues(config.value);
  }

  // установка значений value по лимитам и шагу
  setNewValues(numbersArr: number[]) {
    let newValue: number[] = numbersArr;
    newValue = this.checkLimit(newValue);
    newValue = this.putInStep(newValue);

    let result: number[] = [];
    if (this.range === true) {
      result.push(Math.min.apply(null, newValue));
      result.push(Math.max.apply(null, newValue));
    } else result = newValue;
    this.value = result;
  }

  // проверить значения по  min max
  checkLimit(numbersArr: number[]): number[] {
    const result: number[] = [];
    numbersArr.forEach((number) => {
      if (number < this.minValue) result.push(this.minValue);
      else if (number > this.maxValue) result.push(this.maxValue);
      else result.push(number);
    });
    return result;
  }

  // выставляет на ближайший step и обрезает знаки после запятой
  putInStep(numbersArr: number[]): number[] {
    const result: number[] = [];
    numbersArr.forEach((number) => {
      const value = roundToMultiple(number, this.step);
      result.push(value);
    });
    return result;
  }

  // обновить значение value по лимитам, шагу и выставить по id
  updateValue(number: [number], id: number) {
    let newValue: number[] = this.checkLimit(number);
    newValue = this.putInStep(newValue);
    if (this.range === true) this.value[id] = Number(newValue);
    else this.value = newValue;

    this.Observable.notify({
      value: this.value,
    });
  }

  // для преобразования координат в значения
  convertCoords(data: { coord: number; step: number; id: number }) {
    const newValue = roundToMultiple(data.coord / data.step, this.step) + this.minValue;
    const newArrValue = this.value;

    if (this.range === true) {
      newArrValue[data.id] = newValue;
      this.setNewValues(newArrValue);
    } else this.value[0] = newValue;

    this.Observable.notify({
      value: this.value,
    });
  }
} // Model

export default Model;
