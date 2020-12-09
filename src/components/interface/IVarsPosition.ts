interface ISize {
  height: number;
  width: number;
}
type SizeKeys = keyof ISize;

interface IOffsetFrom {
  offsetTop: number;
  offsetLeft: number;
}
type OffsetFromKeys = keyof IOffsetFrom;

interface IOffsetSize {
  offsetWidth: number;
  offsetHeight: number;
}
type OffsetSizeKeys = keyof IOffsetSize;

interface IClientSize {
  clientWidth: number;
  clientHeight: number;
}
type ClientSizeKeys = keyof IClientSize;

interface IOffset {
  bottom: number;
  top: number;
  right: number;
  left: number;
}
type OffsetKeys = keyof IOffset;

interface IPage {
  pageX: number;
  pageY: number;
}
type PageKeys = keyof IPage;

interface IPositionVars {
  size: SizeKeys;
  offset: OffsetKeys;
  clientSize: ClientSizeKeys;
  offsetSize: OffsetSizeKeys;
  offsetFrom: OffsetFromKeys;
  page: PageKeys;
}

export default IPositionVars;
