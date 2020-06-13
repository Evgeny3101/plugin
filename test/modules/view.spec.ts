import {RangeSlider} from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let newSlider = new RangeSlider('.js-plugin', {})

// beforeEach(() => {
// })

describe('testing View', () => {
  it('fixtures', () => {
    expect(newSlider.view).toBeDefined();
  });

})

