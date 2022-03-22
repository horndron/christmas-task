export interface ItemInfo {
  element: Element
  x: number
  y: number
  width: number,
  height: number,
}

export interface ActiveFilters {
  name: string[];
  shape: string[];
  count: number[];
  year: number[];
  color: string[];
  size: string[];
  favorite: string[];
  search: string[];
}

export default ItemInfo;
