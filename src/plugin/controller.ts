import IConfig from './interface/IConfig';
import Model from './model';
import View from './view/view';

class Controller {
  isMouseDown: boolean = false;

  constructor(public model: Model, public view: View, public config: IConfig) {
    ///  notify Model  ///
    this.subscribeToChangeValue();

    ///  notify View ///
    this.subscribeRange();
    this.subscribeButtons();
    this.subscribeTextField();
    this.subscribePoint();
  }

  // уведомляет метод Model.setNewValue
  private subscribeToChangeValue() {
    this.model.Observable.subscribe((options: { value: number[] }) => {
      const { value } = options;
      const { isMouseDown } = this;

      if (!isMouseDown) {
        this.view.convertValues(value);
        this.view.toPositionElements();
      }

      this.view.setValues(value);
    });
  }

  // уведомляет метод Range.handleRangeClick
  private subscribeRange()  {
    this.view.range.Observable.subscribe(( clickPosition: number ) => {

      const indexOfRequiredButton = this.view.defineButtonIndexByCoord(clickPosition);
      const buttonsCoords = this.view.button.map((btn) => btn.coord);
      buttonsCoords[indexOfRequiredButton] = clickPosition;
      const newValues = this.view.convertCoords(buttonsCoords); 

      this.model.setNewValues(newValues);
    });
  }

  // уведомляет метод Button.move
  private subscribeButtons() {
    this.view.button.forEach((elem, index) => {
      elem.Observable.subscribe((options: { isMouseDown: boolean }) => {
        const { isMouseDown } = options;
        const { label } = this.view;
        const { isRange, isLabel } = this.config;

        this.isMouseDown = isMouseDown;

        if (isRange) {
          if (isMouseDown) {
            elem.DOM.classList.add('rs-range-slider__button_lift-up');
            if (isLabel) label[index].DOM.classList.add('rs-button-label_lift-up');
          } else {
            elem.DOM.classList.remove('rs-range-slider__button_lift-up');
            if (isLabel) label[index].DOM.classList.remove('rs-button-label_lift-up');
          }
        }

        if (isMouseDown) {
          this.view.toPositionElements();
        }

        const buttonsCoords = this.view.button.map((btn) => btn.coord);
        const newValues = this.view.convertCoords(buttonsCoords); 
  
        this.model.setNewValues(newValues);
      });
    });
  }

  // уведомляет метод TextField.getValue
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

          let indexOfRequiredButton = 0;

          if (isRange) {
            // определяем индекс ближайшей кнопки
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
