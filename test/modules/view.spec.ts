// import '../../src/jquery-wrapper';
// import View from '../../src/ts/layers/view/view';
// import Config from '../../src/components/interface/IConfig';

// let config: Config;
// let view: View;
// let mainDOM: Element;

// jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
// jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

// describe('View testing.', () => {
//   beforeEach(() => {
//     loadFixtures('fixt.html');
//     loadStyleFixtures('fixt.css');
//     mainDOM = document.querySelector('.js-plugin');

//     config = $.fn.rangeSlider.defaults;
//     config.textField = ['.text-field', '.text-field2'];

//     view = new View(mainDOM, config);
//   });

//   it('Elements DOM defined.', () => {
//     expect(view.range.DOM).toBeDefined();
//     expect(view.button[0].DOM).toBeDefined();
//     expect(view.textField[0].DOM).toBeDefined();
//   });

//   it('Sets position variables, if isInvert == true.', () => {
//     config.isInvert = true;
//     view.init(config);
//     expect(view.pos.offset).toEqual('right');

//     config.isVertical = true;
//     view.init(config);
//     expect(view.pos.offset).toBe('bottom');
//   });

//   it('Element "interval" is defined, if range == true.', () => {
//     config.isRange = true;
//     view.init(config);

//     expect(view.interval.DOM).toBeDefined();
//   });

//   it('Element "label" is defined, if label == true.', () => {
//     config.isLabel = true;
//     view.init(config);

//     expect(view.label[0].DOM).toBeDefined();
//   });

//   it('Show label on click selected, if labelOnClick == true.', () => {
//     config.isLabel = true;
//     config.isLabelOnClick = true;
//     view.init(config);

//     expect(view.label[0].DOM).toHaveClass('js-label__hide');
//   });

//   it('Element "scale" is defined, if scale == true.', () => {
//     config.isScale = true;
//     view.init(config);

//     expect(view.scale.DOM).toBeDefined();
//   });

//   it('The "updateSize" method. Updates size slider.', () => {
//     view.range.DOM.classList.add('js-test-size');
//     view.updateSize(config); // maxValue, minValue, sliderValues
//     view.range.DOM.classList.remove('js-test-size');

//     expect(view.rangeSize).toBe(110);
//   });
// });
