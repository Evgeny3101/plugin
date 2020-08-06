import ElemDOM from '../../util/elemDOM';

class Point extends ElemDOM {
  textField: ElemDOM | undefined;
  value!: number;
  coord!: number;
  line!: ElemDOM;

  constructor(parent: Element) {
    super(parent, 'div', 'js-scale-line');
  }
} // class

export default Point;
