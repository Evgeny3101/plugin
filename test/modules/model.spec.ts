import myPlugin from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let jsPlugin = new myPlugin('.js-plugin', {})

// beforeEach(() => {
// })

describe('testing Model', () => {
  it('fixtures', () => {
    expect(jsPlugin.model).toBeDefined();
  });

})






