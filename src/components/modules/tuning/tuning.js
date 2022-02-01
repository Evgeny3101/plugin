class Tuning {
  constructor(tuningDOM, slider) {
    this.tuningDOM = tuningDOM;
    this.slider = slider;

    this.searchHTML(tuningDOM);
    this.setOptionsTuning(this.slider.currentConfig);
    this.setListeners();
  }

  setOptionsTuning(config) {
    const { tuningDOM } = this;
    const names = Object.keys(config);
  
    names.forEach((name) => {
      if (name === 'sliderValues') {
        const inputDOM1 = tuningDOM.querySelector(`input[name=${'value1Slider'}]`);
        const inputDOM2 = tuningDOM.querySelector(`input[name=${'value2Slider'}]`);

        [inputDOM1.value, inputDOM2.value ] = config.sliderValues;
        return;
      }
      
      if (name === 'sliderType') {
        const inputDOM = 
          tuningDOM.querySelector(`input[value=${config[name]}]`);

        inputDOM.checked = true;
        return;
      }

      const inputs = tuningDOM.querySelectorAll(`input[name=${name}]`);
      inputs.forEach((elem) => {
        const inputDOM = elem;
        
        if (inputDOM.type === 'text') {
          inputDOM.value = config[name];
          return;
        }
  
        if (inputDOM.value === String(config[name])) {
          inputDOM.checked = true;
        }
      });
    });
  }

  setListeners() {
    const { inputsRadio, inputsText, handleButtonClick, handleButtonBlur } = this;
    
    inputsRadio.forEach((elem) =>
      elem.addEventListener('click', handleButtonClick)
    );
    inputsText.forEach((elem) =>
      elem.addEventListener('blur', handleButtonBlur)
    );
  }

  searchHTML(tuningDOM) {
    this.inputsRadio = tuningDOM.querySelectorAll('input[type="radio"]');
    this.inputsText = tuningDOM.querySelectorAll('input[type="text"]');
  }

  handleButtonClick = (event) => {
    const { slider } = this;
    const { name } = event.target;
    let { value } = event.target;
    
    if (value === 'true') value = true;
    else if (value === 'false') value = false;

    const newOptions = {[name]: value};
    
    slider.delete();
    slider.setConfig(newOptions);
    this.setOptionsTuning(slider.currentConfig);
  };
  
  handleButtonBlur = () => {
    const { inputsText, slider } = this;
    const newOptions = {};

    inputsText.forEach((input) => {
      let { value } = input;
      const isEmpty = value.length === 0 || !value.trim();

      value = Number(value); 
      const isNumber = !Number.isNaN(value);

      if(isEmpty || !isNumber) {
        return;
      }

      newOptions[input.name] = value;
    });

    slider.delete();
    slider.setConfig(newOptions);
    this.setOptionsTuning(slider.currentConfig);
  };
}

export default Tuning;