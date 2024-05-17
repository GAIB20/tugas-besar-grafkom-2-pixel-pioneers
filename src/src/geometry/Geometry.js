import { BufferAttribute } from "./BufferAttribute.js";
import { BufferGeometry } from "./BufferGeometry.js";

export class Geometry extends BufferGeometry {
  constructor(
    vertices,
    colors = [],
    position = { x: 0, y: 0, z: 0 },
    size = { x: 1, y: 1, z: 1 }
  ) {
    super(colors);

    this.position = position;
    this.vertices = new Float32Array(vertices);
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
    if (this._useVertexColors) {
      this.setAttribute(
        "color",
        new BufferAttribute(this.vertexColors, 3, {
          dtype: WebGLRenderingContext.UNSIGNED_BYTE,
          normalize: true,
        })
      );
    }
    this.calculateNormals();
  }

  toJSON() {
    const parent = super.toJSON();
    delete parent.attributes.position;
    delete parent.attributes.color;
    return {
      ...parent,
      position: this.position,
      size: this.size,
      type: "Geometry",
      vertices: JSON.stringify(this.vertices),
      vertexColors: JSON.stringify(this.vertexColors),
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry) {
      geometry = new Geometry(
        new Float32Array(Object.values(JSON.parse(json.vertices))),
        new Uint8Array(Object.values(JSON.parse(json.vertexColors))),
        json.position,
        json.size
      );
    }
    super.fromJSON(json, geometry);
    return geometry;
  }
}
