// import {RangeSlider} from '../../src/ts/main';

// setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
// let newSlider = new RangeSlider('.js-plugin', {
//   value     : [20],
//   textField : ['.text-field']
// })
// let view = newSlider.view


// describe('View testing', () => {

//   beforeEach(() => {
//     setFixtures('<div class="js-plugin"></div><input class="text-field"></input><input class="text-field2"></input>')
//     newSlider.dataset({
//       value     : [20,22],
//       textField : ['.text-field', '.text-field2']
//     })
//   })

//   it('elements DOM defined', () => {
//     expect(view.range.DOM).toBeDefined();
//     expect(view.button[0].DOM).toBeDefined();
//     expect(view.textFieldDOM[0]).toBeDefined()
//   })

// ////////////////////textField////////////////////////

//   it('установка textFieldDOM', () => {
//     view.setTextField(['.text-field'])
//     expect(view.textFieldDOM[0]).toHaveClass('text-field');
//   });


//   it('установка value в textFieldDOM', () => {
//     newSlider.view.setTextField(['.text-field'])
//     newSlider.view.updateTextField([123])
//     expect(newSlider.view.textFieldDOM[0].value).toBe('123');

//     newSlider.view.setTextField(['.text-field', '.text-field2'])
//     newSlider.view.updateTextField([121, 33])
//     expect(newSlider.view.textFieldDOM[0].value).toBe('121');
//     expect(newSlider.view.textFieldDOM[1].value).toBe('33');

//     newSlider.view.updateTextField([21])
//     expect(newSlider.view.textFieldDOM[0].value).toBe('21');
//   });
// ////////////////////button////////////////////////


//   it('move method defined', () => {
//     let btn = view.button[0]

//     spyOn(btn, 'move')
//     btn.move();

//     expect(btn.move).toHaveBeenCalled();
//   })



//   it('"mousemove" event is triggered', () => {
//     let elem = view.button[0].DOM;
//     let spyEvent = spyOnEvent(document, 'mousemove');

//     let mousedown = new MouseEvent("mousedown")
//     elem.dispatchEvent(mousedown)
//     let event = new MouseEvent("mousemove")
//     document.dispatchEvent(event)

//     expect('mousemove').toHaveBeenTriggeredOn(document)
//     expect(spyEvent).toHaveBeenTriggered()
//   });


//   it('"mousemove" event checking limits', () => {
//     let elem = view.button[0].DOM;

//     let mousedown = new MouseEvent("mousedown")
//     elem.dispatchEvent(mousedown)

//     let event = new MouseEvent("mousemove", {
//       clientX: 10000,
//       clientY: 10000
//     })
//     document.dispatchEvent(event)

//     let event2 = new MouseEvent("mousemove", {
//       clientX: -10000,
//       clientY: -10000
//     })
//     document.dispatchEvent(event2)
//   });


//   it('"mouseup" event is triggered', () => {
//     var elem = view.button[0].DOM;
//     var spyEvent = spyOnEvent(document, 'mouseup');

//     let mousedown = new MouseEvent("mousedown")
//     elem.dispatchEvent(mousedown)
//     let event = new MouseEvent("mouseup")
//     document.dispatchEvent(event)

//     expect('mouseup').toHaveBeenTriggeredOn(document)
//     expect(spyEvent).toHaveBeenTriggered()
//     expect(document.onmouseup).toBe(null)
//     expect(document.onmousemove).toBe(null)
//   })


// })

