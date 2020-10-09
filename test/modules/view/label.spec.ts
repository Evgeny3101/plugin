// import '../../../src/jquery-wrapper';
// import View from '../../../src/ts/layers/view/view';
// import Config from '../../../src/components/interface/IConfig';

// let config: Config;
// let view: View;
// let mainDOM: Element;

// jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
// jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

// describe('Label testing.', () => {
//   beforeEach(() => {
//     loadFixtures('fixt.html');
//     loadStyleFixtures('fixt.css');
//     mainDOM = document.querySelector('.js-plugin');

//     config = $.fn.rangeSlider.defaults;
//     config.textField = ['.text-field', '.text-field2'];

//     view = new View(mainDOM, config);
//   });

//   it('The "show/hide" method. Show label on click.', () => {
//     config.isLabel = true;
//     view.init(config);

//     view.label[0].hide();
//     expect(view.label[0].DOM).toHaveClass('js-label__hide');

//     view.label[0].show();
//     expect(view.label[0].DOM).not.toHaveClass('js-label__hide');
//   });
// });
