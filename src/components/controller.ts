import IConfig from './interface/IConfig';
import Model from './model';
import View from './view/view';

class Controller {
  model!: Model;
  view!: View;
  isMouseDown: boolean = false;

  constructor(public mainDOM: Element, public config: IConfig) {
    this.setNewConfig(this.config);
  }

  init() {
    this.model = new Model(this.config);
    this.config.sliderValues = this.model.config.sliderValues; // после проверки лимитов и шага в Model

    this.view = new View(this.mainDOM, this.config);

    ///  notify Model  ///
    this.subscribeToChangeValue();

    ///  notify View ///
    this.subscribeButtons();
    this.subscribeTextField();
    this.subscribePoint();
  }

  setNewConfig(options: any) {
    const newConfig = options;
    const { sliderType, value1Slider, value2Slider } = options;

    if (typeof value1Slider === 'number') {
      newConfig.sliderValues[0] = value1Slider;
      delete newConfig.value1Slider;
    }
    if (typeof value2Slider === 'number') {
      newConfig.sliderValues[1] = value2Slider;
      delete newConfig.value2Slider;
    }
    if (sliderType) {
      newConfig.isSingle = sliderType === 'single';
      newConfig.isRange = sliderType === 'range';
      newConfig.isProgress = sliderType === 'progress';
    }

    delete newConfig.sliderType;

    this.config = newConfig;
    this.init();
  }

  // уведомляет метод Model.setNewValue
  private subscribeToChangeValue() {
    this.model.Observable.subscribe((options: { value: number[] }) => {
      const { value } = options;
      const { isMouseDown } = this;

      if (isMouseDown === false) {
        this.view.convertValues(value);
        this.view.setCoords();
        this.view.toPositionElements();
      }

      this.view.setValues(value);
    });
  }

  // уведомляет метод Button.move
  private subscribeButtons() {
    this.view.button.forEach((elem) => {
      elem.Observable.subscribe((options: { isMouseDown: boolean }) => {
        const { isMouseDown } = options;
        const { step } = this.view;

        const buttonsCoords = this.view.button.map((btn) => btn.coord);

        this.isMouseDown = isMouseDown;

        if (isMouseDown) {
          this.view.setCoords();
          this.view.toPositionElements();
        }

        this.model.convertCoords({
          buttonsCoords,
          stepInCoord: step,
        });
      });
    });
  }

  // уведомляет метод textField.getValue
  private subscribeTextField() {
    if (this.view.textField)
      this.view.textField.forEach((elem) => {
        elem.Observable.subscribe((options: { value: number; index: number }) => {
          const { value, index } = options;
          this.model.updateValue(value, index);
        });
      });
  }

  // уведомляет метод Point.clickPoint
  private subscribePoint() {
    if (this.view.scale)
      this.view.scale.points.forEach((point) => {
        point.Observable.subscribe((options: { value: number }) => {
          const { value } = options;
          const { isRange } = this.config;

          let indexOfRequiredButton;

          // начальное количество кнопок не определено
          if (!isRange) {
            indexOfRequiredButton = 0;
          } else {
            // ищем ближайшую кнопку
            // получаем текущие координаты кнопок
            const btn1 = this.view.button[0].coord;
            const btn2 = this.view.button[1].coord;

            const range = btn2 - btn1;
            const btn1Diapason = range / 2 + btn1;

            indexOfRequiredButton = point.coord > btn1Diapason ? 1 : 0;
          }

          this.model.updateValue(value, indexOfRequiredButton);
        });
      });
  }
} // class

export default Controller;
