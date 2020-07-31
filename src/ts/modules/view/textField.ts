import Observable from '../../util/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement;

  constructor(id: string) {
    this.setTextField(id);
  }

  // установка text-field
  setTextField(id: string) {
    const elem: HTMLInputElement | null = document.querySelector(id);
    if (!elem) throw new Error('Text field not funded.'); // null
    this.DOM = elem;
  }

  // установка значений из text-field
  toInputValues() {
    const newValue = [Number(this.DOM.value) || 0];

    this.Observable.notify({
      value: newValue,
      elem: this,
    });
  }

  updateTextField(data: { value: number[]; id: number }) {
    this.DOM.value = String(data.value[data.id] || 0);
  }
}

export default TextField;
