abstract class elemDOM {
  DOM: HTMLElement

  constructor(id: Element, elem: string, className: string) {
    this.DOM = document.createElement(elem)
    this.DOM.className = className
    id.appendChild(this.DOM)
  }

}

export {elemDOM}