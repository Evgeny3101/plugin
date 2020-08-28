interface IConfig {
  sliderValues: number[];
  minValue: number;
  maxValue: number;
  step: number;
  textField: string[];

  isSingle: boolean;
  isRange: boolean;
  isProgress: boolean;
  isVertical: boolean;
  isInvert: boolean;

  isLabel: boolean;
  isLabelOnClick: boolean;

  isScale: boolean;
  points: number;
  numberForEach: number;
  longForEach: number;
}

export default IConfig;
