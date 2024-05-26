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

    const texCoord = new Float32Array([
      // Front face
      0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0,

      // Back face
      0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0,

      // Top face
      0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0,

      // Bottom face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,

      // Right face
      0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0,

      // Left face
      0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0,
    ]);

    this.setAttribute("texcoord", new BufferAttribute(texCoord, 2));

    this.calculateNormals();
  }

  toJSON() {
    const parent = super.toJSON();
    delete parent.attributes.position;
    delete parent.attributes.texcoord;
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
