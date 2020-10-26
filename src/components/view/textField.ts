import Observable from '../../ts/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement | HTMLElement;
  handleTextFieldBlur: EventListener;
  isInput!: boolean;

  constructor(field: string, public index: number) {
    this.find(field);
    this.handleTextFieldBlur = this.getValue.bind(this);
  }

  find(field: string) {
    const elem: HTMLInputElement | HTMLElement | null = document.querySelector(field);

    if (!elem) throw new Error('Text field not found.');

    this.isInput = elem.nodeName === 'INPUT';
    this.DOM = elem;
  }

  // получает значения из текстового поля
  getValue() {
    let newValue;
    if (this.isInput) newValue = Number(this.DOM.value) || 0;
    else newValue = Number(this.DOM.innerText) || 0;

    this.Observable.notify({
      value: newValue,
      index: this.index,
    });
  }

  // устанавливает значения в текстовое поле
  setValue(value: number) {
    if (this.isInput) this.DOM.value = String(value);
    else this.DOM.innerText = String(value);
  }
}

export default TextField;
