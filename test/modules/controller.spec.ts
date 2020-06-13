import {RangeSlider} from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let newSlider = new RangeSlider('.js-plugin', {})

// beforeEach(() => {
// })

describe('testing Controller', () => {
  it('fixtures', () => {
    expect(newSlider.controller).toBeDefined();
  });

})
















