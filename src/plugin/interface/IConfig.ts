interface IConfig {
  sliderValues: number[];
  readonly minValue: number;
  readonly maxValue: number;
  readonly step: number;
  readonly textField: string[];

  readonly isSingle: boolean;
  readonly isRange: boolean;
  readonly isProgress: boolean;
  readonly isVertical: boolean;
  readonly isInvert: boolean;

  readonly isLabel: boolean;
  readonly isLabelOnClick: boolean;

  readonly isScale: boolean;
  readonly pointsForEach: number;
  readonly numberForEach: number;
  readonly longForEach: number;

  updateValues(sliderValues: number[]): string[];
}

export default IConfig;
