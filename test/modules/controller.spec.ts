// import {RangeSlider} from '../../src/ts/main';

// setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')


// let newSlider = new RangeSlider('.js-plugin', {
//   value     : [20, 28],
//   range     : true,
//   textField : ['.text-field', '.text-field2']
// })

// describe('Controller testing.', () => {

//   beforeEach(() => {
//     setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
//   })

//   it('input[0] содержит "22", input[1] содержит "50"', () => {
//     newSlider.dataset({
//       value     : [20, 28],
//       range     : true
//     })
//     newSlider.view.textFieldDOM[0].value = '22'
//     newSlider.controller.toInputValues(newSlider.model, newSlider.view, 0)
//     newSlider.view.textFieldDOM[1].value = '50'
//     newSlider.controller.toInputValues(newSlider.model, newSlider.view, 1)

//     expect(newSlider.view.textFieldDOM[0].value).toBe('22');
//     expect(newSlider.view.textFieldDOM[1].value).toBe('50');
//   });

//   it('input[0] содержит "55"', () => {
//     newSlider.dataset({
//       range     : false
//     })
//     newSlider.view.textFieldDOM[0].value = '55'
//     newSlider.controller.toInputValues(newSlider.model, newSlider.view, 0)

//     expect(newSlider.view.textFieldDOM[0].value).toBe('55');
//   });

// })


