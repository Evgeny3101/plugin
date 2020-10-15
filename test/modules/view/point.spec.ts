import '../../../src/jquery-wrapper';
import Point from '../../../src/components/view/point/point';


setFixtures(
  '<div class="js-plugin"></div>'
);
const $elem = $('.js-plugin').rangeSlider();

let point: Point;


describe('Класс Point.', () => {
  beforeEach(() => {
    $elem.rangeSlider('config', {
      sliderType: 'range',
      isScale :  true,
    });

    [point] = $elem.rangeSlider.sliders[0].view.scale.points;
  });

  it('Метод "clickPoint". Сообщает значение шкалы.', () => {
    const {minValue} = $elem.rangeSlider.sliders[0].config;
    const spyObservable = spyOn(point.Observable, 'notify');
    point.clickPoint();

    expect(spyObservable).toHaveBeenCalledWith({
      value: minValue,
    });
  });

});
