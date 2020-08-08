import ElemDOM from '../../util/elemDOM';

class Point extends ElemDOM {
  textField: ElemDOM | undefined;
  value!: number;
  coord!: number;
  line!: ElemDOM;

  constructor(parent: Element) {
    super('div', 'js-scale-line', parent);
  }
} // class

export default Point;
