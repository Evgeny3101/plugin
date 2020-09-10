import Observable from '../../ts/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement;
  handleTextFieldBlur: EventListener;

  constructor(field: string, public index: number) {
    this.find(field);
    this.handleTextFieldBlur = this.getValue.bind(this);
  }

  find(field: string) {
    const elem: HTMLInputElement | null = document.querySelector(field);
    if (!elem) throw new Error('Text field not found.');
    this.DOM = elem;
  }

  // gets values from the text field
  // old getFieldValues
  getValue() {
    const newValue = [Number(this.DOM.value) || 0];

    this.Observable.notify({
      value: newValue,
      index: this.index,
    });
  }

  // sets values into the text field
  setValue(value: number) {
    this.DOM.value = String(value);
  }
}

export default TextField;
