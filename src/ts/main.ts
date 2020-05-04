import Model from './modules/model'
import View from './modules/view'
import Controller from './modules/controller'

function setPlugin(id: string, dataset: {}) {

  let model      = new Model(dataset);
  let view       = new View(id);
  let controller = new Controller(model, view);

  return {
    model,
    view,
    controller,
  }
}


