import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class Geometry extends BufferGeometry {
  constructor(vertices, position = { x: 0, y: 0, z: 0 }) {
    super();
    
    this.position = position;

    const px = position.x,
          py = position.y,
          pz = position.z;

    // Adjust vertices based on the provided center position
    const adjustedVertices = new Float32Array(vertices.length);
    for (let i = 0; i < vertices.length; i += 3) {
      adjustedVertices[i] = vertices[i] + px;
      adjustedVertices[i + 1] = vertices[i + 1] + py;
      adjustedVertices[i + 2] = vertices[i + 2] + pz;
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
      type: "Geometry",
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry)
      geometry = new Geometry(new Float32Array(json.vertices), json.position);
    super.fromJSON(json, geometry);
    return geometry;
  }
}
