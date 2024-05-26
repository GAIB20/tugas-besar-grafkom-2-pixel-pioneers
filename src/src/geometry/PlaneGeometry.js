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

    const texCoord = new Float32Array([
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 0,
    ]);
    this.setAttribute("texcoord", new BufferAttribute(texCoord, 2));
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
