import { type } from "react-typical";
import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class BoxGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;

    const hw = width / 2,
      hh = height / 2,
      hd = depth / 2;

    const vertices = new Float32Array([
      // Front
      -hw,
      -hh,
      hd,
      hw,
      -hh,
      hd,
      hw,
      hh,
      hd,
      -hw,
      hh,
      hd,
      // Back
      -hw,
      -hh,
      -hd,
      -hw,
      hh,
      -hd,
      hw,
      hh,
      -hd,
      hw,
      -hh,
      -hd,
      // Top
      -hw,
      hh,
      -hd,
      -hw,
      hh,
      hd,
      hw,
      hh,
      hd,
      hw,
      hh,
      -hd,
      // Bottom
      -hw,
      -hh,
      -hd,
      hw,
      -hh,
      -hd,
      hw,
      -hh,
      hd,
      -hw,
      -hh,
      hd,
      // Left
      -hw,
      -hh,
      -hd,
      -hw,
      -hh,
      hd,
      -hw,
      hh,
      hd,
      -hw,
      hh,
      -hd,
      // Right
      hw,
      -hh,
      -hd,
      hw,
      hh,
      -hd,
      hw,
      hh,
      hd,
      hw,
      -hh,
      hd,
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
      depth: this.depth,
      type: "BoxGeometry",
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry)
      geometry = new BoxGeometry(json.width, json.height, json.depth);
    super.fromJSON(json, geometry);
    return geometry;
  }
}
