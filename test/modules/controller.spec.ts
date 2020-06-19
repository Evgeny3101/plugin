import {RangeSlider} from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')


let newSlider = new RangeSlider('.js-plugin', {
  value     : [20],
  textField : ['.text-field']
})




