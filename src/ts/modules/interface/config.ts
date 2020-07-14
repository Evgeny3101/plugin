interface Config {
  value: number[];
  minValue: number;
  maxValue: number;
  step: number;
  textField: string[];

  range: boolean;
  vertical: boolean;
  invert: boolean;

  label: boolean;
  lableOnClick: boolean;

  scale: boolean;
  points: number;
  numberForEach: number;
  longForEach: number;
}

export default Config;
