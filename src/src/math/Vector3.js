export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y, z) {
    this.x = x !== undefined ? x : this.x;
    this.y = y !== undefined ? y : this.y;
    this.z = z !== undefined ? z : this.z;
    return this;
  }

  sub(val) {
    if (val instanceof Vector3) {
      this.x -= val.x;
      this.y -= val.y;
      this.z -= val.z;
    } else if (typeof val === "number") {
      this.x -= val;
      this.y -= val;
      this.z -= val;
    } else {
      throw new Error("Invalid argument type");
    }
    return this;
  }

  mul(val) {
    if (val instanceof Vector3) {
      this.x *= val.x;
      this.y *= val.y;
      this.z *= val.z;
    } else if (typeof val === "number") {
      this.x *= val;
      this.y *= val;
      this.z *= val;
    } else {
      throw new Error("Invalid argument type");
    }
    return this;
  }

  div(val) {
    if (val instanceof Vector3) {
      this.x /= val.x;
      this.y /= val.y;
      this.z /= val.z;
    } else if (typeof val === "number") {
      return this.mul(1 / val);
    } else {
      throw new Error("Invalid argument type");
    }
    return this;
  }

  normalize() {
    const length = this.length || 1; // Avoid division by zero
    return this.div(length);
  }

  cross(v) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return this.set(x, y, z);
  }

  fromBufferAttribute(attribute, index) {
    return this.set(
      ...attribute.get(index, attribute.size),
      ...[0, 0, 0].slice(attribute.size)
    );
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }

  toJSON() {
    return this.toArray();
  }
}
