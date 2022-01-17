# Jquery range slider plugin.

Имеет несколько типов слайдера с 1-2 бегунками и возможностью менять значения.

[Примеры на сайте](https://evgeny3101.github.io/plugin/index.html)

[Репозиторий](https://github.com/Evgeny3101/plugin.git)

## API

```js
// установка
\$('.my-slider-wrapper').rangeSlider({
  ...
});

// установка конфигурации
\$('.my-slider-wrapper').rangeSlider('config', {
  sliderType: 'progress',
  value1Slider: 0,
  step: 1,
});

// удаление слайдера
\$('.my-slider-wrapper').rangeSlider('delete');

// включить/отключить события
\$('.my-slider-wrapper').rangeSlider('setListeners');
\$('.my-slider-wrapper').rangeSlider('removeListeners');
```

## Параметры и настройки по умолчанию

```js
{

  sliderType: 'single', // или 'progress', 'range'

  sliderValues: [-25, 25], // по умолчанию
  value1Slider: -23, // если параметр указан значение sliderValue будет переписано
  value2Slider: 23,  // если параметр указан значение sliderValue будет переписано

  minValue: -100,
  maxValue: 100,
  step: 10,

  textField: [], // для ввода/вывода значений.
                 // Строкой указывать идентификатор на HTMLElement

  isVertical: false, // позиционирование слайдера
  isInvert: false,   // позиционирование слайдера

  isLabel: false,
  isLabelOnClick: false, // отображение по нажатию

  isScale: false,
  pointsForEach: 2,   // отметка отображается на каждом "n" шаге
  numberForEach: 4,   // число отображается на каждой "n" отметке
  longForEach: 2,     // длинная черточка на каждом "n" отметке

  // позволяет задать свою обработку значений слайдера
  updateValues(values)  {
    const valuesArr = values.map((name) => `${name.toLocaleString()}$`);

    // возвращенное значение будет выставлено в textField и label
    // без return будут выставлены обычные значения
    return valuesArr;
  }

}
```

## Клонирование репозитория

```
git clone https://github.com/Evgeny3101/plugin.git
```

## Запуск разработки

Установка

```
npm i
```

Запуск веб сервера

```
npm start
```

Запуск тестов

```
npm test
```

Запуск сборки

```
npm run build
```

Запуск линтера

```
npm run lint
```

## Архитектура

Приложение делится на три слоя.

Слой RangeSlider, содержит API.

Слой Controller, обеспечивает взаимодействие Model и View.

Слой Model, управления данными, содержать бизнес-логику.

Слой View, содержит логику связанную с отображением и обеспечивает взаимодействие пользователя с приложением.

Компоненты слоя View при действиях пользователя передают изменения на Controller.

Controller передает(при необходимости собирает) значения и вызывает необходимые методы в Model и/или View.

После обработки значений в Model, изменения передаются в Controller который обновит View.

#### Структура плагина

![Plugin structure](uml/slider.svg)

#### Структура класса View

![Class "View" structure](uml/viewComponents.svg)
