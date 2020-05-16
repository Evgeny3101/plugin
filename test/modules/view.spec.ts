import myPlugin from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let jsPlugin = new myPlugin('.js-plugin', {})

// beforeEach(() => {
// })

describe('testing View', () => {
  it('fixtures', () => {
    expect(jsPlugin.view).toBeDefined();
  });

})


