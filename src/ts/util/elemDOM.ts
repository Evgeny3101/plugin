class ElemDOM {
  DOM!: HTMLElement;

  constructor(id: Element, elem: string, className: string) {
    this.setDOM(id, elem, className);
  }

  // установка this.DOM
  setDOM(id: Element, elem: string, className: string) {
    this.DOM = document.createElement(elem);
    this.DOM.className = className;
    id.appendChild(this.DOM);
  }
}

export default ElemDOM;
