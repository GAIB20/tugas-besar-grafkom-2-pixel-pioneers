import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class BoxGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();
    this.width = width;
    this.height = height;

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
}
