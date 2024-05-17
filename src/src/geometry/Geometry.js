import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class Geometry extends BufferGeometry {
  constructor(vertices, position = { x: 0, y: 0, z: 0 }, size = { x: 1, y: 1, z: 1 }) {
    super();
    
    this.position = position;
    this.size = size;

    const px = position.x,
          py = position.y,
          pz = position.z;

    const sx = size.x,
          sy = size.y,
          sz = size.z;

    // Adjust vertices based on the provided center position and size
    const adjustedVertices = new Float32Array(vertices.length);
    for (let i = 0; i < vertices.length; i += 3) {
      adjustedVertices[i] = vertices[i] * sx + px;
      adjustedVertices[i + 1] = vertices[i + 1] * sy + py;
      adjustedVertices[i + 2] = vertices[i + 2] * sz + pz;
    }

    this.setAttribute("position", new BufferAttribute(adjustedVertices, 3));
    this.calculateNormals();
  }

  toJSON() {
    const parent = super.toJSON();
    delete parent.attributes.position;
    return {
      ...parent,
      position: this.position,
      size: this.size,
      type: "Geometry",
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry) {
      geometry = new Geometry(new Float32Array(json.vertices), json.position, json.size);
    }
    super.fromJSON(json, geometry);
    return geometry;
  }
}
