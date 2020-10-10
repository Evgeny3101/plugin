import '../../src/jquery-wrapper';
import Model from '../../src/components/model';
import IConfig from '../../src/components/interface/IConfig';

let model: Model;
let config: IConfig;

describe('Класс Model.', () => {
  beforeEach(() => {
    model = new Model($.fn.rangeSlider.defaults);
    config = model.defaultConfig;
  });

  it('Метод "checkLimit". Проверяет лимиты и возвращает значение. Должно вернуть [-100] и [100].', () => {
    expect(model.checkLimit([-999])).toEqual([-100]);
    expect(model.checkLimit([999])).toEqual([100]);
  });

  it('Метод "putInStep". Проверяет шаг и возвращает значение. Должно вернуть [-20, 81].', () => {
    config.step = 1;
    model.value = [-19.51, 81.49];
    expect(model.putInStep(model.value)).toEqual([-20, 81]);
  });

  it('Метод "setNewValues". Устанавливает значения по лимиту и шагу. Должно вернуть [100], [-100, 100] и [-99.9, 99.9].', () => {
    config.isRange = false;
    model.setNewValues([999]);
    expect(model.value).toEqual([100]);

    config.isRange = true;
    model.setNewValues([1222, -222.23]);
    expect(model.value).toEqual([-100, 100]);

    config.step = 0.1;
    model.setNewValues([-99.851, 99.94]);
    expect(model.value).toEqual([-99.9, 99.9]);
  });

  it('Метод "updateValue". Обновляет значение по индексу и вызывает метод setNewValues.', () => {
    config.isRange = false;
    model.updateValue(999, 0);
    expect(model.value[0]).toEqual(100);

    config.isRange = true;
    model.value = [100, 200];
    model.updateValue(-222.23, 1);
    expect(model.value).toEqual([-100, 100]);
  });

  it('Метод "convertCoords". Конвертирует координаты в значения и вызывает метод setNewValues.', () => {
    config.isRange = false;
    model.convertCoords({
      buttonsCoords: [11],
      stepInCoord: 0.23,
    });
    expect(model.value[0]).toEqual(-52.2);

    config.isRange = true;
    model.convertCoords({
      buttonsCoords: [75],
      stepInCoord: 0.23,
    });
    expect(model.value[1]).toEqual(100);
  });
});
