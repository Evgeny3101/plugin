class ElemDOM {
  DOM!: HTMLElement;

  constructor(parent: Element, element: string, className: string) {
    this.setDOM(parent, element, className);
  }

  // установка this.DOM
  setDOM(parent: Element, element: string, className: string) {
    this.DOM = document.createElement(element);
    this.DOM.className = className;
    parent.appendChild(this.DOM);
  }
}

export default ElemDOM;
