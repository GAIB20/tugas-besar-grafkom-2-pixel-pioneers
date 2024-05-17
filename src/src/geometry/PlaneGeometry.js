import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class PlaneGeometry extends BufferGeometry {
  constructor(width = 1, height = 1) {
    super();
    this.width = width;
    this.height = height;
    const hw = width / 2,
      hh = height / 2;
    const vertices = new Float32Array([
      -hw,
      0,
      -hh,
      hw,
      0,
      -hh,
      hw,
      0,
      hh,
      -hw,
      0,
      hh,
      -hw,
      0,
      -hh,
      hw,
      0,
      hh,
    ]);
    this.setAttribute("position", new BufferAttribute(vertices, 3));
    this.calculateNormals();
  }

  toJSON() {
    const parent = super.toJSON();
    delete parent.attributes.position;
    return {
      ...parent,
      width: this.width,
      height: this.height,
      type: "PlaneGeometry",
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry) geometry = new PlaneGeometry(json.width, json.height);
    super.fromJSON(json, geometry);
    return geometry;
  }
}
