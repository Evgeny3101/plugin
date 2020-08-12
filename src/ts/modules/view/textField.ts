import Observable from '../../util/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement;

  constructor(field: string, public index: number) {
    this.setTextField(field);
  }

  setTextField(field: string) {
    const elem: HTMLInputElement | null = document.querySelector(field);
    if (!elem) throw new Error('Text field not funded.'); // null
    this.DOM = elem;
  }

  // gets values from the text field
  getFieldValues() {
    const newValue = [Number(this.DOM.value) || 0];

    this.Observable.notify({
      value: newValue,
      index: this.index,
    });
  }

  // sets values into the text field
  setValue(value: number[]) {
    this.DOM.value = String(value[this.index] || 0);
  }
}

export default TextField;
