import Observable from '../../util/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement;
  index: number;

  constructor(field: string, index: number) {
    this.setTextField(field);
    this.index = index;
  }

  // установка text-field
  setTextField(field: string) {
    const elem: HTMLInputElement | null = document.querySelector(field);
    if (!elem) throw new Error('Text field not funded.'); // null
    this.DOM = elem;
  }

  // установка значений из text-field
  toInputValues() {
    const newValue = [Number(this.DOM.value) || 0];

    this.Observable.notify({
      value: newValue,
      index: this.index,
    });
  }

  updateTextField(value: number[]) {
    this.DOM.value = String(value[this.index] || 0);
  }
}

export default TextField;
