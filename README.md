# Jquery range slider plugin.

Имеет несколько типов слайдера с 1-2 бегунками и возможностью менять значения.

[Примеры](https://...)

[Репозиторий](https://github.com/Evgeny3101/plugin.git)

## API

```js
// установка
\$('.my-slider-wrapper').rangeSlider({
  sliderType: 'range',
  sliderValues: [-100, 100],
  step: 0.1,
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

  minValue: 0,
  maxValue: 100,
  step: 1,

  textField: [], // для ввода/вывода значений. Строкой указывать идентификатор на input

  isVertical: false, // позиционирование слайдера
  isInvert: false,   // позиционирование слайдера

  isLabel: false,
  isLabelOnClick: false, // отображение по нажатию

  isScale: false,
  points: 13,         // количество отметок шкалы (делений шкалы -1 = 12)
  numberForEach: 4,   // число отображается на каждом "n"
  longForEach: 2,     // длинная черточка на каждом "n"

}
```

## Клонирование репозитория

```
git clone https://github.com/Evgeny3101/plugin.git
```

## Запуск разработки

```
npm start
```

```
npm test
```

```
npm run build
```

## Архитектура

Приложение делится на три слоя.

Слой Controller, содержит API и обеспечивает взаимодействие Model и View.

Слой Model, управления данными, содержать бизнес-логику.

Слой View, содержит логику связанную с отображением и обеспечивает взаимодействие пользователя с приложением.

Компоненты слоя View при действиях пользователя передают изменения на Controller.

Controller передает(при необходимости собирает) значения и вызывает необходимые методы в Model и/или View.

После обработки значений в Model, изменения передаются в Controller который обновит View.

#### Структура плагина

![Plugin structure](uml/slider.svg)

#### Структура класса View

![Class "View" structure](uml/viewComponents.svg)
