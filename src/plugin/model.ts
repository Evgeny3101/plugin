import { roundToMultiple } from './utils/mixins';
import Observable from './utils/observable';
import IConfig from './interface/IConfig';

class Model {
  Observable: Observable = new Observable();
  currentConfig!: IConfig;
  config!: IConfig;

  constructor( config: IConfig, currentConfig: IConfig, public defaultConfig: any) {
    this.setConfig(config, currentConfig);

    const { sliderValues } = this.config;
    this.setNewValues(sliderValues);
  } // constructor

  setConfig(options: any, currentConfig: IConfig) {
    const { defaultConfig } = this;
    const baseConfig = { ...defaultConfig, ...currentConfig };
    let newConfig = { ...baseConfig, ...options };
    newConfig = this.validValues(newConfig, currentConfig);

    const configNames = Object.keys(options);
    configNames.forEach(name => {
      const checkValue = options[name];
      const typeValue = typeof defaultConfig[name];

      if(typeValue === 'number') {
        const isValid = typeof checkValue === 'number' && !Number.isNaN(checkValue) && Number.isFinite(checkValue);

        newConfig[name] = isValid ? checkValue : baseConfig[name];
      } else if(typeValue === 'boolean') {
        const isValid = typeof checkValue === 'boolean';

        newConfig[name] = isValid ? options[name] : baseConfig[name];
      } else if(typeValue === 'string' && name === 'sliderType') {
        const { sliderType } = options;

        newConfig.isSingle = sliderType === 'single';
        newConfig.isRange = sliderType === 'range';
        newConfig.isProgress = sliderType === 'progress';
      } 
    });

    if(newConfig.minValue > newConfig.maxValue) {
      const min = newConfig.minValue;
      const max = newConfig.maxValue;

      newConfig.minValue = max;
      newConfig.maxValue = min;
    }

    if(newConfig.pointsForEach < 1) newConfig.pointsForEach = 1;

    newConfig.step = this.validStep(options, currentConfig);
    this.config = newConfig;
  }

  // Обновит значение слайдера по id
  updateValue(number: number, index: number) {
    const values = this.config.sliderValues;
    values[index] = number;

    this.setNewValues(values);
  }

  // Устанавливает новые значения
  setNewValues(values: number[]) {
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

  private validValues(options: any, currentConfig: IConfig) {
    const baseConfig = { ...this.defaultConfig, ...currentConfig };
    const newConfig = { ...baseConfig, ...options };
    const { value1Slider, value2Slider, sliderValues } = options;

    if(sliderValues) {
      sliderValues.forEach((value: number, i: number) => {
        const isNumber = typeof value === 'number' && !Number.isNaN(value);
        newConfig.sliderValues[i] = isNumber ? value : baseConfig.sliderValues[i];
      });
    }

    if(value1Slider || value2Slider) {
      const values = [value1Slider, value2Slider];
      values.forEach((value: number, i: number) => {
        const isNumber = typeof value === 'number' && !Number.isNaN(value);
        newConfig.sliderValues[i] = isNumber ? value : baseConfig.sliderValues[i];
      });

      delete newConfig.value1Slider;
      delete newConfig.value2Slider;
    }

    return newConfig;
  }

  private validStep(options: any, currentConfig: IConfig) {
    const baseConfig = { ...this.defaultConfig, ...currentConfig };
    const newConfig = { ...baseConfig, ...options };
    const { minValue, maxValue, step } = newConfig;
    const interval = maxValue - minValue;
    const isStepFall = step === 0 || interval < step;
    const isIntegerStep = Number.isInteger(interval / step);

    if(step < 0) {
      newConfig.step = baseConfig.step;
    }  else if(isStepFall) {
      newConfig.step = interval;
    } else if(interval === 0) {
      newConfig.step = 0;
    } else if(!isIntegerStep) {
      const points = Math.ceil(interval / step);
      newConfig.step = interval / (points - 1);
    }

    return newConfig.step;
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
    const { maxValue, minValue, step } = this.config;
    const roundValuesArr: number[] = [];

    numbersArr.forEach((number, i) => {
      roundValuesArr[i]  = roundToMultiple(number, step, minValue, maxValue);
    });

    return roundValuesArr;
  }
} // Model

export default Model;
