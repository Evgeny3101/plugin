abstract class elemDOM {
  DOM: HTMLElement
  position: string  = 'left'
  coord: number

  constructor(id: Element, elem: string, className: string) {
    this.DOM = document.createElement(elem)
    this.DOM.className = className
    id.appendChild(this.DOM)

    this.coord = this.getCoords()
  }

  getCoords() {
    let box = this.DOM.getBoundingClientRect();
    let result =  {
        top:  box.top + pageYOffset,
        left: box.left + pageXOffset
    };
    return result[this.position]
  }

}

export {elemDOM}