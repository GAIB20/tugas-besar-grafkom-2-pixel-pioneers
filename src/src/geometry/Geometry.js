import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class Geometry extends BufferGeometry {
  constructor(vertices) {
    super();
    
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
      type: "Geometry",
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry)
      geometry = new Geometry(json.width, json.height, json.depth);
    super.fromJSON(json, geometry);
    return geometry;
  }
}
