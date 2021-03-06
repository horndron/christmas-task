export class Toy {
  num: number;

  name: string;

  count: number;

  year: number;

  shape: string;

  color: string;

  size: string;

  favorite: boolean;

  constructor(
    num: number,
    name: string,
    count: number,
    year: number,
    shape: string,
    color: string,
    size: string,
    favorite: boolean,
  ) {
    this.num = num;
    this.name = name;
    this.count = count;
    this.year = year;
    this.shape = shape;
    this.color = color;
    this.size = size;
    this.favorite = favorite;
  }

}

export default Toy;
