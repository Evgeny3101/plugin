import Observable from '../../util/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement;
  invert: boolean;

  constructor(id: string, invert: boolean) {
    this.setTextField(id);
    this.invert = invert;
  }

  // установка text-field
  setTextField(id: string) {
    const elem: HTMLInputElement | null = document.querySelector(id);
    if (!elem) throw new Error('Text field not funded.'); // null
    this.DOM = elem;
  }

  // установка значений из text-field
  toInputValues() {
    let newValue;
    if (this.invert) newValue = [-Number(this.DOM.value) || 0];
    else newValue = [Number(this.DOM.value) || 0];

    this.Observable.notify({
      value: newValue,
      elem: this,
    });
  }

  updateTextField(data: { value: number[]; id: number }) {
    if (this.invert) this.DOM.value = String(-data.value[data.id] || 0);
    else this.DOM.value = String(data.value[data.id] || 0);
  }
}

export default TextField;
