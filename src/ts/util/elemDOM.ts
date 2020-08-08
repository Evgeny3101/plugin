class ElemDOM {
  DOM!: HTMLElement;

  constructor(element: string, className: string, parent?: Element) {
    this.createDOM(element, className);
    if (parent) this.appendInDOM(parent);
  }

  // creates element
  createDOM(element: string, className: string) {
    this.DOM = document.createElement(element);
    this.DOM.className = className;
  }

  appendInDOM(parent: Element) {
    parent.appendChild(this.DOM);
  }
}

export default ElemDOM;
