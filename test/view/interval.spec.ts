import '../../src/jquery-wrapper';

const $: any = jQuery;
let interval: any;

setFixtures('<div class="js-plugin"></div>');
const $elem = $('.js-plugin').rangeSlider();

describe('Класс Interval.', () => {
  beforeEach(() => {
    $elem.rangeSlider('config', {
      sliderType: 'progress',
    });

    interval = $elem.rangeSlider.sliders[0].view.interval;
  });

  it('Метод "checkOverrun". Проверяет перебег, если есть переворачивает координаты интервала.', () => {
    interval.buttonsCoord = [20, 10];
    interval.checkOverrun();

    expect(interval.buttonsCoord).toEqual([10, 20]);
  });
});
