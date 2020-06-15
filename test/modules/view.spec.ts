import {RangeSlider} from '../../src/ts/main';

setFixtures('<div class="js-plugin"></div>')
let newSlider = new RangeSlider('.js-plugin', {})
let view = newSlider.view


// beforeEach(() => {
// })

describe('testing View', () => {

  it('fixtures', () => {
    expect(newSlider.view).toBeDefined();
  });


  it('elements DOM defined', () => {
    expect(view.range).toBeDefined();
    expect(view.button).toBeDefined();
  })

})

///////////////////////////////////////

describe('testing button', () => {

  it('move method defined', () => {
    let btn = view.button[0]

    spyOn(btn, 'move')
    btn.move();

    expect(btn.move).toHaveBeenCalled();
  })


  it('"mousedown" event is triggered', () => {
    let elem = view.button[0].DOM;
    let spyEvent = spyOnEvent(elem, 'mousedown');

    let event = new MouseEvent("mousedown")
    elem.dispatchEvent(event)

    expect('mousedown').toHaveBeenTriggeredOn(elem)
    expect(spyEvent).toHaveBeenTriggered()
  })


  it('"mousemove" event is triggered', () => {
    let elem = view.button[0].DOM;
    let spyEvent = spyOnEvent(document, 'mousemove');

    let mousedown = new MouseEvent("mousedown")
    elem.dispatchEvent(mousedown)
    let event = new MouseEvent("mousemove")
    document.dispatchEvent(event)

    expect('mousemove').toHaveBeenTriggeredOn(document)
    expect(spyEvent).toHaveBeenTriggered()
  });


  it('"mousemove" event checking limits', () => {
    let elem = view.button[0].DOM;

    let mousedown = new MouseEvent("mousedown")
    elem.dispatchEvent(mousedown)

    let event = new MouseEvent("mousemove", {
      clientX: 10000,
      clientY: 10000
    })
    document.dispatchEvent(event)

    let event2 = new MouseEvent("mousemove", {
      clientX: -10000,
      clientY: -10000
    })
    document.dispatchEvent(event2)
  });


  it('"mouseup" event is triggered', () => {
    var elem = view.button[0].DOM;
    var spyEvent = spyOnEvent(document, 'mouseup');

    let mousedown = new MouseEvent("mousedown")
    elem.dispatchEvent(mousedown)
    let event = new MouseEvent("mouseup")
    document.dispatchEvent(event)

    expect('mouseup').toHaveBeenTriggeredOn(document)
    expect(spyEvent).toHaveBeenTriggered()
    expect(document.onmouseup).toBe(null)
    expect(document.onmousemove).toBe(null)
  })

})
