import myPlugin from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let jsPlugin = new myPlugin('.js-plugin', {})

// beforeEach(() => {
// })

describe('testing Controller', () => {
  it('fixtures', () => {
    expect(jsPlugin.controller).toBeDefined();
  });

})
















