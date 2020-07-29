import '../../src/ts/main';
import Model from '../../src/ts/modules/model';

let model: Model;

describe('Model testing.', () => {
  beforeEach(() => {
    model = new Model($.fn.rangeSlider.defaults);
  });

  it('The "checkLimit" method. Checks limits and return value. Must return [-100] and [100].', () => {
    expect(model.checkLimit([-999])).toEqual([-100]);
    expect(model.checkLimit([999])).toEqual([100]);
  });

  it('The "putInStep" method. Checks step and return value. Must return [-20, 81].', () => {
    model.step = 1;
    model.value = [-19.51, 81.49];
    expect(model.putInStep(model.value)).toEqual([-20, 81]);
  });

  it('The "setNewValues" method. Sets values ​​by limit and step. Must return [100], [-100, 100] and [-99.9, 99.9].', () => {
    model.range = false;
    model.setNewValues([999]);
    expect(model.value).toEqual([100]);

    model.range = true;
    model.setNewValues([1222, -222.23]);
    expect(model.value).toEqual([-100, 100]);

    model.step = 0.1;
    model.setNewValues([-99.851, 99.94]);
    expect(model.value).toEqual([-99.9, 99.9]);
  });

  it('The "updateValue" method. Checks the value by limits, step and set by id.', () => {
    model.range = false;
    model.updateValue([999], 0);
    expect(model.value).toEqual([100]);

    model.range = true;
    model.updateValue([-222.23], 1);
    expect(model.value).toEqual([100, -100]);
  });

  it('The "convertCoords" method. Converts coordinates to value.', () => {
    model.range = false;
    model.convertCoords({
      coord: 11,
      step: 0.23,
      id: 0,
    });
    expect(model.value[0]).toEqual(-52.2);

    model.range = true;
    model.convertCoords({
      coord: 75,
      step: 0.23,
      id: 1,
    });
    expect(model.value[1]).toEqual(100);
  });
});
