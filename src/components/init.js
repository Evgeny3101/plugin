import { slidersArr } from'./modules/slider/slider';
import Tuning from'./modules/tuning/tuning';

const tuningArrDOM = document.querySelectorAll('.tuning');
const tuningArr = [];

slidersArr.forEach((slider, i) => {
  tuningArr[i] = new Tuning(tuningArrDOM[i], slider);
});