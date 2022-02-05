import RangeSlider from '../../../plugin/range-slider';

const slidersArrDOM = document.querySelectorAll('.js-slider');

function correctsConfig(elem) {
  const config = Object.entries({...elem.dataset});
  const newConfig = {};

  config.forEach(([key, value]) => {
    let newValue = value;
    if (value === 'true') newValue = true;
    else if (value === 'false') newValue = false;
    else if (key === 'textfield') newValue = value.replace(/[\s]/g, '').split(',');
    else {
      const isEmpty = value.length === 0 || !value.trim();
      const isNumber = !Number.isNaN(Number(value));

      if(isEmpty || !isNumber) newValue= value;
      else newValue= Number(value);
    }

    switch (key) {
      case 'textfield': 
        newConfig.textField = newValue;
        break;

      case 'slidertype': 
        newConfig.sliderType = newValue;
        break;

      case 'value1slider': 
        newConfig.value1Slider = newValue;
        break;
            
      case 'value2slider': 
        newConfig.value1Slider = newValue;
        break;
        
      case 'minvalue': 
        newConfig.minValue = newValue;
        break;
          
      case 'maxvalue': 
        newConfig.maxValue = newValue;
        break;
        
      case 'isinvert': 
        newConfig.isInvert = newValue;
        break;
        
      case 'islabel': 
        newConfig.isLabel = newValue;
        break;
      
      case 'islabelonclick': 
        newConfig.isLabelOnClick = newValue;
        break;
        
      case 'isscale': 
        newConfig.isScale = newValue;
        break;
      
      case 'isvertical': 
        newConfig.isVertical = newValue;
        break;
            
      case 'pointsforeach': 
        newConfig.pointsForEach = newValue;
        break;
        
      case 'numberforeach': 
        newConfig.numberForEach = newValue;
        break;
          
      case 'longforeach': 
        newConfig.longForEach = newValue;
        break;
            
      default:
        newConfig[key] = newValue;
    }
  });
  return newConfig;
}

const slidersArr = [];
const slidersConfigArr = [];
slidersArrDOM.forEach((elem, i) => {
  const config = correctsConfig(elem);
  slidersConfigArr[i] = config;

  slidersArr[i] = new RangeSlider(elem, config);

});

export {slidersArr, slidersConfigArr}; 