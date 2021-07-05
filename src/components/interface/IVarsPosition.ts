interface ISize {
  height: number;
  width: number;
}
type SizeTypes = keyof ISize;

interface IOffsetFrom {
  offsetTop: number;
  offsetLeft: number;
}
type OffsetFromTypes = keyof IOffsetFrom;

interface IOffsetSize {
  offsetWidth: number;
  offsetHeight: number;
}
type OffsetSizeTypes = keyof IOffsetSize;

interface IClientSize {
  clientWidth: number;
  clientHeight: number;
}
type ClientSizeTypes = keyof IClientSize;

interface IOffset {
  bottom: number;
  top: number;
  right: number;
  left: number;
}
type OffsetTypes = keyof IOffset;

interface IPage {
  pageX: number;
  pageY: number;
}
type PageTypes = keyof IPage;

interface IOffsetCoord {
  offsetX: number;
  offsetY: number;
}
type OffsetCoordTypes = keyof IOffsetCoord;

interface IVarsPosition {
  readonly size: SizeTypes;
  readonly offset: OffsetTypes;
  readonly clientSize: ClientSizeTypes;
  readonly offsetSize: OffsetSizeTypes;
  readonly offsetFrom: OffsetFromTypes;
  readonly page: PageTypes;
  readonly offsetCoord: OffsetCoordTypes;
}

export default IVarsPosition;
