import Observable from '../utils/observable';

class TextField {
  Observable = new Observable();
  DOM!: HTMLInputElement | HTMLElement;

  constructor(field: string, public index: number) {
    this.find(field);
  }

  find(field: string) {
    const elem: HTMLInputElement | HTMLElement | null = document.querySelector(field);

    if (!elem) throw new Error('Text field not found.');
    this.DOM = elem;
  }

  // получает значения из текстового поля
  handleTextFieldBlur = () => {
    let newValue;
    if (this.DOM instanceof HTMLInputElement) newValue = Number(this.DOM.value) || 0;
    else newValue = Number(this.DOM.innerText) || 0;

    this.Observable.notify({
      value: newValue,
      index: this.index,
    });
  };

  // устанавливает значения в текстовое поле
  setValue(value: string) {
    if (this.DOM instanceof HTMLInputElement) this.DOM.value = value;
    else this.DOM.innerText = value;
  }
}

export default TextField;
