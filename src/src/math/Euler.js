export class Euler {
  constructor(x = 0, y = 0, z = 0, order = "XYZ") {
    this.x = x;
    this.y = y;
    this.z = z;
    this.order = order;
  }

  set(x, y, z, order = "XYZ") {
    this.x = x;
    this.y = y;
    this.z = z;
    this.order = order;
    return this;
  }

  clone() {
    return new Euler(this.x, this.y, this.z, this.order);
  }
}
