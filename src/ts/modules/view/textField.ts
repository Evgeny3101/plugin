import { Observable } from '../../util/observable'

class TextField {
  Observable = new Observable()
  DOM: HTMLInputElement
  invert: boolean

  constructor( id: string, invert: boolean ){
    this.DOM = document.querySelector( id )
    this.invert = invert
  }

  // установка значений из text-field
  toInputValues( id ) {
    let num
    if( this.invert ) num = [ -Number( this.DOM.value ) || 0 ]
    else num = [ Number( this.DOM.value ) || 0 ]

    this.Observable.notify({
      num,
      id
    })
  }

  updateTextField( data ) {
    if( this.invert ) this.DOM.value = String( -data.value[data.id] || 0)
    else this.DOM.value = String( data.value[data.id] || 0)
  }

}

export {TextField}