import '../../../src/jquery-wrapper';
import Interval from '../../../src/components/view/interval/interval';


setFixtures(
  '<div class="js-plugin"></div>'
);
const $elem = $('.js-plugin').rangeSlider();

let interval: Interval;


describe('Класс Interval.', () => {
  beforeEach(() => {
    $elem.rangeSlider('config', {
      sliderType: 'progress',
    });

    interval = $elem.rangeSlider.sliders[0].view.interval;
  });


  it('Метод "checkOverrun". Проверяет перебег если есть, переворачивает координаты интервала.', () => {
    interval.buttonsCoord = [20, 10];
    interval.checkOverrun();

    expect(interval.buttonsCoord ).toEqual([10, 20]);
  });

});
