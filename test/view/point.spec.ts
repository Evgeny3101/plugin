import '../../src/jquery-wrapper';
import Point from '../../src/components/view/point/point';

const $: any = jQuery;

setFixtures('<div class="js-plugin"></div>');
const $elem = $('.js-plugin').rangeSlider();

let point: Point;

describe('Класс Point.', () => {
  beforeEach(() => {
    $elem.rangeSlider('config', {
      sliderType: 'range',
      isScale: true,
    });

    [point] = $elem.rangeSlider.sliders[0].view.scale.points;
  });

  it('Метод "handlePointClick". Сообщает значение шкалы.', () => {
    const { minValue } = $elem.rangeSlider.sliders[0].currentConfig;
    const spyObservable = spyOn(point.Observable, 'notify');
    point.handlePointClick();

    expect(spyObservable).toHaveBeenCalledWith({
      value: minValue,
    });
  });
});
