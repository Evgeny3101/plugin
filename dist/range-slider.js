!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){"use strict";n.r(t);n(0),n(1),n(2),n(3),n(4),n(5);function i(e,t){var n=Math.round(e/t)*t,i=t.toString().includes(".")?t.toString().split(".").pop().length:0;return n=Number(n.toFixed(i))}function o(e,t){var n=document.createElement("div");n.innerHTML=e;var i=n.firstElementChild;return t&&t.append(i),i}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.DOM=void 0,this.DOM=o('<div class="js-range-slider"></div>')}var t,n,i;return t=e,(n=[{key:"setClassPosition",value:function(e){e?this.DOM.classList.add("js-range-slider_vertical"):this.DOM.classList.add("js-range-slider_horizontal")}}])&&s(t.prototype,n),i&&s(t,i),e}();function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.observers=void 0,this.observers=[]}var t,n,i;return t=e,(n=[{key:"subscribe",value:function(e){this.observers.push(e)}},{key:"notify",value:function(e){this.observers.forEach((function(t){return t(e)}))}}])&&a(t.prototype,n),i&&a(t,i),e}();function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var c=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pos=n,this.isInvert=i,this.Observable=new u,this.coord=void 0,this.DOM=void 0,this.handleButtonMousedown=void 0,this.DOM=o('<div class="js-range-slider__button"></div>',t),this.handleButtonMousedown=this.move.bind(this)}var t,n,i;return t=e,(n=[{key:"move",value:function(e){var t=this,n=this.pos,i=n.page,o=n.offsetFrom,s=n.offsetSize,r=n.clientSize,a=this.isInvert,u=e.target,l=u.parentElement,c=e[i],f=u[o],h=l[r]-u[s];return document.onmousemove=function(e){var n,o=e[i];(n=a?c-o+(h-f):f-(c-o))<0&&(n=0),n>h&&(n=h),t.setCoord(n),t.Observable.notify({isMouseDown:!0})},document.onmouseup=function(){t.Observable.notify({isMouseDown:!1}),document.onmousemove=null,document.onmouseup=null},!1}},{key:"setCoord",value:function(e){this.coord=e}},{key:"toPosition",value:function(){this.DOM.setAttribute("style","".concat(this.pos.offset," : ").concat(this.coord,"px"))}}])&&l(t.prototype,n),i&&l(t,i),e}();function f(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var v=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pos=n,this.isProgress=i,this.buttonSize=0,this.DOM=void 0,this.buttonsCoord=void 0,this.DOM=o('\n      <div class="js-range-slider__interval">\n        <div class="js-slider-interval"></div>\n      </div>',t)}var t,n,i;return t=e,(n=[{key:"setButtonValue",value:function(e){this.buttonSize=e}},{key:"setCoords",value:function(e){var t=f(e);this.isProgress?this.buttonsCoord=[0,t[0]]:(this.buttonsCoord=t,this.checkOverrun())}},{key:"toPosition",value:function(){var e=this.buttonsCoord,t=this.buttonSize,n=e[1]-e[0],i=e[0]+t/2;this.DOM.setAttribute("style"," ".concat(this.pos.offset,": ").concat(i,"px;\n        ").concat(this.pos.size,": ").concat(n,"px;\n      "))}},{key:"checkOverrun",value:function(){(this.buttonsCoord[0]>this.buttonsCoord[1]||this.buttonsCoord[1]<this.buttonsCoord[0])&&this.buttonsCoord.reverse()}}])&&d(t.prototype,n),i&&d(t,i),e}();function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.isLabelOnClick=n,this.positionName=i,this.DOM=void 0,this.input=void 0,this.coord=void 0,this.handleButtonMousedown=void 0,this.handleButtonMouseup=void 0,this.createElements(t),n&&(this.handleButtonMousedown=this.show.bind(this),this.handleButtonMouseup=this.hide.bind(this))}var t,n,i;return t=e,(n=[{key:"setCoord",value:function(e){this.coord=e}},{key:"toPosition",value:function(){this.DOM.setAttribute("style","".concat(this.positionName," : ").concat(this.coord,"px"))}},{key:"show",value:function(){this.DOM.children[0].classList.remove("js-button-label_hide")}},{key:"hide",value:function(){this.DOM.children[0].classList.add("js-button-label_hide")}},{key:"setValue",value:function(e){this.input.value=String(e)}},{key:"createElements",value:function(e){this.DOM=o('<div class="js-range-slider__container-label">\n        <div class="js-button-label">\n          <input class="js-button-label__input" readonly> </input>\n        </div>\n      </div>',e),this.input=this.DOM.querySelector("input")}}])&&b(t.prototype,n),i&&b(t,i),e}();function y(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var g=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.Observable=new u,this.value=void 0,this.coord=void 0,this.DOM=void 0,this.lineDOM=void 0,this.numberDOM=void 0,this.handlePointClick=void 0,this.DOM=o('<div class="js-scale-point"></div>',t),n&&(this.numberDOM=o('<div class="js-scale-point__number"></div>',this.DOM)),this.lineDOM=o(i?'<div class="js-scale-point__long-line"></div>':'<div class="js-scale-point__short-line"></div>',this.DOM),this.handlePointClick=this.clickPoint.bind(this)}var t,n,i;return t=e,(n=[{key:"clickPoint",value:function(){this.Observable.notify({value:this.value})}}])&&y(t.prototype,n),i&&y(t,i),e}();function m(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var O=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=n,this.points=[],this.DOM=void 0,this.DOM=o('<div class="js-scale-range"></div>',t),this.createPoints()}var t,n,s;return t=e,(n=[{key:"setScale",value:function(e){this.setValue(),this.determineСoordScale(e)}},{key:"setValue",value:function(){var e,t=this.config,n=t.minValue,o=t.maxValue,s=t.step,r=t.isInvert,a=(Math.abs(n)+o)/(this.points.length-1);e=r?o:n,this.points.forEach((function(t){var n=t;n.value=i(e,s),n.numberDOM&&(n.numberDOM.innerText=String(n.value)),e=r?e-a:e+a}))}},{key:"createPoints",value:function(){for(var e=this.config,t=e.points,n=e.numberForEach,i=e.longForEach,o=0;o<t;o+=1){var s=o%n==0,r=o%i==0;this.points[o]=new g(this.DOM,s,r)}}},{key:"determineСoordScale",value:function(e){var t=this.config.isInvert,n=e/(this.points.length-1),i=t?e:0;this.points.forEach((function(e){e.coord=i,i=t?i-=n:i+=n}))}}])&&m(t.prototype,n),s&&m(t,s),e}();function w(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var M=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.index=n,this.Observable=new u,this.DOM=void 0,this.handleTextFieldBlur=void 0,this.find(t),this.handleTextFieldBlur=this.getValue.bind(this)}var t,n,i;return t=e,(n=[{key:"find",value:function(e){var t=document.querySelector(e);if(!t)throw new Error("Text field not found.");this.DOM=t}},{key:"getValue",value:function(){var e;e=this.DOM instanceof HTMLInputElement?Number(this.DOM.value)||0:Number(this.DOM.innerText)||0,this.Observable.notify({value:e,index:this.index})}},{key:"setValue",value:function(e){this.DOM instanceof HTMLInputElement?this.DOM.value=String(e):this.DOM.innerText=String(e)}}])&&w(t.prototype,n),i&&w(t,i),e}();function D(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var k=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=t,this.config=n,this.range=void 0,this.button=[],this.textField=[],this.label=[],this.interval=void 0,this.scale=void 0,this.pos=void 0,this.step=void 0,this.rangeSize=void 0,this.handleWindowResize=void 0,this.setPositionVariables(),this.installComponents(),this.setElementsParameters(),this.setValues(this.config.sliderValues),this.convertValues(this.config.sliderValues),this.setCoords(),this.toPositionElements(),this.handleWindowResize=this.resizeSlider.bind(this)}var t,n,i;return t=e,(n=[{key:"setValues",value:function(e){this.config.sliderValues=e,this.textField&&this.textField.forEach((function(t,n){t.setValue(e[n])})),this.label&&this.label.forEach((function(t,n){t.setValue(e[n])}))}},{key:"convertValues",value:function(e){var t=this,n=this.config,i=n.minValue;if(n.isRange)e.forEach((function(e,n){var o=t.step*(e+Math.abs(i));t.button[n].setCoord(o)}));else{var o=this.step*(e[0]+Math.abs(i));this.button[0].setCoord(o)}}},{key:"setCoords",value:function(){var e=this,t=this.config,n=t.isLabel,i=t.isInvert,o=this.button.map((function(e){return e.coord})),s=this.button.map((function(t){return t.DOM[e.pos.offsetSize]}));this.interval&&this.interval.setCoords(o),n&&this.label.forEach((function(e,t){i?e.setCoord(o[t]+s[t]):e.setCoord(o[t])}))}},{key:"toPositionElements",value:function(){this.button.forEach((function(e){return e.toPosition()})),this.interval&&this.interval.toPosition(),this.label&&this.label.forEach((function(e){return e.toPosition()}))}},{key:"setPositionVariables",value:function(){var e=this.config,t=e.isVertical,n=e.isInvert;this.pos=t?{size:"height",offset:n?"bottom":"top",clientSize:"clientHeight",offsetSize:"offsetHeight",page:"pageY",offsetFrom:"offsetTop"}:{size:"width",offset:n?"right":"left",clientSize:"clientWidth",offsetSize:"offsetWidth",page:"pageX",offsetFrom:"offsetLeft"}}},{key:"installComponents",value:function(){var e=this,t=this.config,n=t.isRange,i=t.isProgress,o=t.isInvert,s=t.isVertical,a=t.isLabel,u=t.isLabelOnClick,l=t.isScale,f=t.textField,h=n||i;this.range=new r,this.range.setClassPosition(s),this.button=[];for(var d=n?2:1,b=0;b<d;b+=1)this.button[b]=new c(this.range.DOM,this.pos,o);h&&(this.interval=new v(this.range.DOM,this.pos,i)),a&&(this.label=[],this.button.forEach((function(t,n){e.label[n]=new p(e.range.DOM,u,e.pos.offset)}))),l&&(this.scale=new O(this.range.DOM,this.config)),f&&f.forEach((function(t,n){e.textField[n]=new M(t,n)})),this.parent.append(this.range.DOM)}},{key:"updateRangeSize",value:function(){var e=this.config,t=e.minValue,n=e.maxValue,i=this.button[0].DOM[this.pos.offsetSize],o=this.range.DOM[this.pos.clientSize];this.rangeSize=o-i;var s=Math.abs(n-t);this.step=this.rangeSize/s}},{key:"setElementsParameters",value:function(){if(this.updateRangeSize(),this.interval){var e=this.button[0].DOM[this.pos.offsetSize];this.interval.setButtonValue(e)}this.scale&&this.scale.setScale(this.rangeSize)}},{key:"resizeSlider",value:function(){this.updateRangeSize(),this.setValues(this.config.sliderValues),this.convertValues(this.config.sliderValues),this.setCoords(),this.toPositionElements()}}])&&D(t.prototype,n),i&&D(t,i),e}();function C(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var E=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=t,this.Observable=new u;var n=this.config.sliderValues;this.setNewValues(n)}var t,n,o;return t=e,(n=[{key:"convertCoords",value:function(e){var t=e.buttonsCoords,n=e.stepInCoord,i=this.config.minValue,o=t.map((function(e){return e/n+i}));this.setNewValues(o)}},{key:"updateValue",value:function(e,t){var n=this.config.sliderValues;n[t]=e,this.setNewValues(n)}},{key:"setNewValues",value:function(e){var t=[];this.config.isRange?(t.push(Math.min.apply(null,e)),t.push(Math.max.apply(null,e))):t=e,t=this.checkLimit(t),t=this.putInStep(t),this.config.sliderValues=t,this.Observable.notify({value:t})}},{key:"checkLimit",value:function(e){var t=this.config,n=t.minValue,i=t.maxValue,o=[];return e.forEach((function(e){e<n?o.push(n):e>i?o.push(i):o.push(e)})),o}},{key:"putInStep",value:function(e){var t=this.config.step,n=[];return e.forEach((function(e,o){n[o]=i(e,t)})),n}}])&&C(t.prototype,n),o&&C(t,o),e}();function S(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var j=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.model=t,this.view=n,this.config=i,this.isMouseDown=!1,this.subscribeToChangeValue(),this.subscribeButtons(),this.subscribeTextField(),this.subscribePoint()}var t,n,i;return t=e,(n=[{key:"subscribeToChangeValue",value:function(){var e=this;this.model.Observable.subscribe((function(t){var n=t.value;e.isMouseDown||(e.view.convertValues(n),e.view.setCoords(),e.view.toPositionElements()),e.view.setValues(n)}))}},{key:"subscribeButtons",value:function(){var e=this;this.view.button.forEach((function(t,n){t.Observable.subscribe((function(i){var o=i.isMouseDown,s=e.view,r=s.step,a=s.label,u=e.config,l=u.isRange,c=u.isLabel,f=e.view.button.map((function(e){return e.coord}));e.isMouseDown=o,l&&(o?(t.DOM.classList.add("js-range-slider__button_lift-up"),c&&a[n].DOM.classList.add("js-button-label_lift-up")):(t.DOM.classList.remove("js-range-slider__button_lift-up"),c&&a[n].DOM.classList.remove("js-button-label_lift-up"))),o&&(e.view.setCoords(),e.view.toPositionElements()),e.model.convertCoords({buttonsCoords:f,stepInCoord:r})}))}))}},{key:"subscribeTextField",value:function(){var e=this;this.view.textField&&this.view.textField.forEach((function(t){t.Observable.subscribe((function(t){var n=t.value,i=t.index;e.model.updateValue(n,i)}))}))}},{key:"subscribePoint",value:function(){var e=this;this.view.scale&&this.view.scale.points.forEach((function(t){t.Observable.subscribe((function(n){var i,o=n.value;if(e.config.isRange){var s=e.view.button[0].coord,r=(e.view.button[1].coord-s)/2+s;i=t.coord>r?1:0}else i=0;e.model.updateValue(o,i)}))}))}}])&&S(t.prototype,n),i&&S(t,i),e}();function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){L(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var T=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.defaultConfig=i,this.model=void 0,this.view=void 0,this.controller=void 0,this.mainDOM=void 0,this.currentConfig=void 0,this.findDOM(t),this.setConfig(n)}var t,n,i;return t=e,(n=[{key:"setConfig",value:function(e){var t=V(V(V({},this.defaultConfig),this.currentConfig),e),n=t.sliderType,i=t.value1Slider,o=t.value2Slider;"number"==typeof i&&(t.sliderValues[0]=i,delete t.value1Slider),"number"==typeof o&&(t.sliderValues[1]=o,delete t.value2Slider),n&&(t.isSingle="single"===n,t.isRange="range"===n,t.isProgress="progress"===n),this.currentConfig=t,this.init()}},{key:"init",value:function(){this.model=new E(this.currentConfig),this.currentConfig.sliderValues=this.model.config.sliderValues,this.view=new k(this.mainDOM,this.currentConfig),this.controller=new j(this.model,this.view,this.currentConfig),this.setListeners()}},{key:"setListeners",value:function(){var e=this.controller.view,t=this.currentConfig.isLabel&&this.currentConfig.isLabelOnClick;window.addEventListener("resize",e.handleWindowResize),e.button.forEach((function(e){e.DOM.addEventListener("mousedown",e.handleButtonMousedown)})),e.textField.forEach((function(e){e.DOM&&e.DOM.addEventListener("blur",e.handleTextFieldBlur)})),e.scale&&e.scale.points.forEach((function(e){e.DOM.addEventListener("click",e.handlePointClick)})),t&&e.label.forEach((function(t,n){t.hide(),e.button[n].DOM.addEventListener("mousedown",t.handleButtonMousedown),document.addEventListener("mouseup",t.handleButtonMouseup)}))}},{key:"removeListeners",value:function(){var e=this.controller.view,t=this.currentConfig.isLabel&&this.currentConfig.isLabelOnClick;window.removeEventListener("resize",e.handleWindowResize),e.button.forEach((function(e){e.DOM.removeEventListener("mousedown",e.handleButtonMousedown)})),e.textField.forEach((function(e){e.DOM&&e.DOM.removeEventListener("blur",e.handleTextFieldBlur)})),e.scale&&e.scale.points.forEach((function(e){e.DOM.removeEventListener("click",e.handlePointClick)})),t&&e.label.forEach((function(t,n){t.show(),e.button[n].DOM.removeEventListener("mousedown",t.handleButtonMousedown),document.removeEventListener("mouseup",t.handleButtonMouseup)}))}},{key:"delete",value:function(){this.removeListeners(),this.mainDOM.innerHTML=""}},{key:"findDOM",value:function(e){var t;if(!(t="string"==typeof e?document.querySelector(e):e))throw new Error("Main DOM element not found.");this.mainDOM=t}}])&&x(t.prototype,n),i&&x(t,i),e}();function z(e){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e){var t=e,n={init:function(e){return this.each((function(n,i){var o=new T(i,e,t.fn.rangeSlider.defaultConfig);t.fn.rangeSlider.sliders.push(o)}))},delete:function(){return this.each((function(e,n){t.fn.rangeSlider.sliders.forEach((function(e,i){return e.mainDOM===n&&(e.delete(),delete t.fn.rangeSlider.sliders[i]),!1}))}))},config:function(e){return this.each((function(n,i){t.fn.rangeSlider.sliders.forEach((function(t){return t.mainDOM===i&&(t.delete(),t.setConfig(e)),!1}))}))},setListeners:function(){return this.each((function(e,n){t.fn.rangeSlider.sliders.forEach((function(e){return e.mainDOM===n&&e.setListeners(),!1}))}))},removeListeners:function(){return this.each((function(e,n){t.fn.rangeSlider.sliders.forEach((function(e){return e.mainDOM===n&&e.removeListeners(),!1}))}))}};t.fn.rangeSlider=function(e){if(n[e]){for(var i=arguments.length,o=new Array(i>1?i-1:0),s=1;s<i;s++)o[s-1]=arguments[s];return n[e].apply(this,o)}if("object"===z(e)||!e){var r=e;return n.init.apply(this,[r])}return t.error("Method named ".concat(e," does not exist for jQuery.rangeSlider"))},t.fn.rangeSlider.sliders=[],t.fn.rangeSlider.defaultConfig={sliderType:"single",sliderValues:[-25,25],minValue:-100,maxValue:100,step:1,textField:[],isVertical:!1,isInvert:!1,isLabel:!1,isLabelOnClick:!1,isScale:!1,points:13,numberForEach:4,longForEach:2}}(jQuery)}]);