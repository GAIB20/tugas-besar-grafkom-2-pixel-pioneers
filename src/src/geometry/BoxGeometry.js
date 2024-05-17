import { pyramidColor } from "../models/hollow/pyramid.js";
import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class BoxGeometry extends BufferGeometry {
  constructor(
    width = 1,
    height = 1,
    depth = 1,
    position = { x: 0, y: 0, z: 0 }
  ) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position = position;

    const hw = width / 2,
      hh = height / 2,
      hd = depth / 2;

    const px = position.x,
      py = position.y,
      pz = position.z;

    const vertices = new Float32Array([
      // Front face
      -hw + px,
      hh + py,
      hd + pz,
      -hw + px,
      -hh + py,
      hd + pz,
      hw + px,
      -hh + py,
      hd + pz,
      hw + px,
      hh + py,
      hd + pz,
      -hw + px,
      hh + py,
      hd + pz,
      hw + px,
      -hh + py,
      hd + pz,
      // Back face
      -hw + px,
      hh + py,
      -hd + pz,
      hw + px,
      -hh + py,
      -hd + pz,
      -hw + px,
      -hh + py,
      -hd + pz,
      hw + px,
      hh + py,
      -hd + pz,
      hw + px,
      -hh + py,
      -hd + pz,
      -hw + px,
      hh + py,
      -hd + pz,
      // Top face
      -hw + px,
      hh + py,
      -hd + pz,
      -hw + px,
      hh + py,
      hd + pz,
      hw + px,
      hh + py,
      hd + pz,
      hw + px,
      hh + py,
      -hd + pz,
      -hw + px,
      hh + py,
      -hd + pz,
      hw + px,
      hh + py,
      hd + pz,
      // Bottom face
      -hw + px,
      -hh + py,
      -hd + pz,
      hw + px,
      -hh + py,
      -hd + pz,
      hw + px,
      -hh + py,
      hd + pz,
      -hw + px,
      -hh + py,
      hd + pz,
      -hw + px,
      -hh + py,
      -hd + pz,
      hw + px,
      -hh + py,
      hd + pz,
      // Right face
      hw + px,
      -hh + py,
      -hd + pz,
      hw + px,
      hh + py,
      hd + pz,
      hw + px,
      -hh + py,
      hd + pz,
      hw + px,
      -hh + py,
      -hd + pz,
      hw + px,
      hh + py,
      -hd + pz,
      hw + px,
      hh + py,
      hd + pz,
      // Left face
      -hw + px,
      -hh + py,
      -hd + pz,
      -hw + px,
      hh + py,
      hd + pz,
      -hw + px,
      hh + py,
      -hd + pz,
      -hw + px,
      -hh + py,
      -hd + pz,
      -hw + px,
      -hh + py,
      hd + pz,
      -hw + px,
      hh + py,
      hd + pz,
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
      position: this.position,
      type: "BoxGeometry",
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry)
      geometry = new BoxGeometry(
        json.width,
        json.height,
        json.depth,
        json.position
      );
    super.fromJSON(json, geometry);
    return geometry;
  }
}
