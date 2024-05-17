import { pyramidColor } from "../models/hollow/pyramid.js";
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
      // Front Face
      -45,
      -45,
      5, //corner 1
      -30,
      -30,
      5, // inner 1
      0,
      30,
      0, // inner 2

      -45,
      -45,
      5, // corner 1
      0,
      30,
      0, // inner 2
      0,
      45,
      0, //corner 2

      -45,
      -45,
      5, //corner 1
      45,
      -45,
      5, // corner 3
      -30,
      -30,
      5, // inner 1

      30,
      -30,
      5, // inner 3
      -30,
      -30,
      5, // inner 1
      45,
      -45,
      5, // corner 3

      30,
      -30,
      5, // inner 3
      45,
      -45,
      5, // corner 3
      0,
      30,
      0, // inner 2

      45,
      -45,
      5, // corner 3
      0,
      45,
      0, // corner 2
      0,
      30,
      0, // inner 2

      // Back face
      -45,
      -45,
      -5, //corner 1
      0,
      30,
      0, // inner 2
      -30,
      -30,
      -5, // inner 1

      -45,
      -45,
      -5, // corner 1
      0,
      45,
      0, //corner 2
      0,
      30,
      0, // inner 2

      -45,
      -45,
      -5, //corner 1
      -30,
      -30,
      -5, // inner 1
      45,
      -45,
      -5, // corner 3

      30,
      -30,
      -5, // inner 3
      45,
      -45,
      -5, // corner 3
      -30,
      -30,
      -5, // inner 1

      30,
      -30,
      -5, // inner 3
      0,
      30,
      0, // inner 2
      45,
      -45,
      -5, // corner 3

      45,
      -45,
      -5, // corner 3
      0,
      30,
      0, // inner 2
      0,
      45,
      0, // corner 2

      // Side
      -45,
      -45,
      -5,
      -45,
      -45,
      5,
      0,
      45,
      0,

      45,
      -45,
      5,
      45,
      -45,
      -5,
      0,
      45,
      0,

      // Bottom
      -45,
      -45,
      5,
      -45,
      -45,
      -5,
      45,
      -45,
      5,

      45,
      -45,
      -5,
      45,
      -45,
      5,
      -45,
      -45,
      -5,

      // Inner side

      -30,
      -30,
      -5,
      0,
      30,
      0,
      -30,
      -30,
      5,

      30,
      -30,
      5,
      0,
      30,
      0,
      30,
      -30,
      -5,

      // Inner Bottom
      -30,
      -30,
      5,
      30,
      -30,
      5,
      -30,
      -30,
      -5,

      30,
      -30,
      -5,
      -30,
      -30,
      -5,
      30,
      -30,
      5,

      // Rotated
      // Front Face
      5,
      -45,
      -45, //corner 1
      0,
      30,
      0, // inner 2
      5,
      -30,
      -30, // inner 1

      5,
      -45,
      -45, // corner 1
      0,
      45,
      0, //corner 2
      0,
      30,
      0, // inner 2

      5,
      -45,
      -45, //corner 1
      5,
      -30,
      -30, // inner 1
      5,
      -45,
      45, // corner 3

      5,
      -30,
      30, // inner 3
      5,
      -45,
      45, // corner 3
      5,
      -30,
      -30, // inner 1

      5,
      -30,
      30, // inner 3
      0,
      30,
      0, // inner 2
      5,
      -45,
      45, // corner 3

      5,
      -45,
      45, // corner 3
      0,
      30,
      0, // inner 2
      0,
      45,
      0, // corner 2

      // Back face
      -5,
      -45,
      -45, //corner 1
      -5,
      -30,
      -30, // inner 1
      0,
      30,
      0, // inner 2

      -5,
      -45,
      -45, // corner 1
      0,
      30,
      0, // inner 2
      0,
      45,
      0, //corner 2

      -5,
      -45,
      -45, //corner 1
      -5,
      -45,
      45, // corner 3
      -5,
      -30,
      -30, // inner 1

      -5,
      -30,
      30, // inner 3
      -5,
      -30,
      -30, // inner 1
      -5,
      -45,
      45, // corner 3

      -5,
      -30,
      30, // inner 3
      -5,
      -45,
      45, // corner 3
      0,
      30,
      0, // inner 2

      -5,
      -45,
      45, // corner 3
      0,
      45,
      0, // corner 2
      0,
      30,
      0, // inner 2

      // Side
      -5,
      -45,
      -45,
      0,
      45,
      0,
      5,
      -45,
      -45,

      -5,
      -45,
      45,
      5,
      -45,
      45,
      0,
      45,
      0,

      // Βottom
      5,
      -45,
      -45,
      5,
      -45,
      45,
      5,
      -45,
      -45,

      -5,
      -45,
      45,
      -5,
      -45,
      -45,
      5,
      -45,
      45,

      // Inner side

      -5,
      -30,
      -30,
      5,
      -30,
      -30,
      0,
      30,
      0,

      5,
      -30,
      30,
      -5,
      -30,
      30,
      0,
      30,
      0,

      // Inner Βottom
      5,
      -30,
      -30,
      -5,
      -30,
      -30,
      5,
      -30,
      30,

      -5,
      -30,
      30,
      5,
      -30,
      30,
      -5,
      -30,
      -30,
    ]);

    this.setAttribute("position", new BufferAttribute(vertices, 3));
    this.setAttribute(
      "color",
      new BufferAttribute(pyramidColor, 3, {
        dtype: WebGLRenderingContext.UNSIGNED_BYTE,
        normalize: true,
      })
    );
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
