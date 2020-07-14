import ElemDOM from '../../util/elemDOM';

class Point extends ElemDOM {
  textField!: ElemDOM;
  value!: number;
  coord!: number;
  line!: ElemDOM;

  constructor(id: Element) {
    super(id, 'div', 'js-scale-line');
  }
} // class

export default Point;
