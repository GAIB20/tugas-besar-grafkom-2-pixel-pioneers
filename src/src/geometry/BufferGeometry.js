import { Vector3 } from "../math/Vector3.js";
import { BufferAttribute } from "./BufferAttribute.js";

export class BufferGeometry {
  constructor(vertexColors = []) {
    this._attributes = {};
    if (vertexColors.length > 0) this._useVertexColors = true;
    else this._useVertexColors = false;
    this._vertexColors = vertexColors;
  }

  get useVertexColors() {
    return this._useVertexColors;
  }

  get vertexColors() {
    return this._vertexColors;
  }

  get attributes() {
    return this._attributes;
  }

  get indices() {
    return this._indices;
  }

  setIndices(indices) {
    this._indices = indices;
    return this;
  }

  removeIndices() {
    this._indices = undefined;
    return this;
  }

  setAttribute(name, attribute) {
    this._attributes[name] = attribute;
    return this;
  }

  getAttribute(name) {
    return this._attributes[name];
  }

  deleteAttribute(name) {
    delete this._attributes[name];
    return this;
  }

  calculateNormals(forceNewAttribute = false) {
    const position = this.getAttribute("position");
    if (!position) return;
    let normal = this.getAttribute("normal");
    if (forceNewAttribute || !normal)
      normal = new BufferAttribute(
        new Float32Array(position.length),
        position.size
      );

    const pA = new Vector3(),
      pB = new Vector3(),
      pC = new Vector3();
    for (let i = 0; i < position.length; i += 3) {
      pA.fromBufferAttribute(position, i);
      pB.fromBufferAttribute(position, i + 1);
      pC.fromBufferAttribute(position, i + 2);

      pC.sub(pB);
      pB.sub(pA);
      pB.cross(pC);

      const d = pB.normalize().toArray();
      normal.set(i, d);
      normal.set(i + 1, d);
      normal.set(i + 2, d);
    }

    this.setAttribute("normal", normal);
  }

  toJSON() {
    const attributes = {};
    Object.entries(this.attributes).forEach(([name, value]) => {
      if (name === "normal") return;
      attributes[name] = value.toJSON();
    });

    return {
      type: "BufferGeometry",
      attributes: attributes,
    };
  }

  static fromJSON(json, geometry = null) {
    if (!geometry) geometry = new BufferGeometry();

    for (const name in json.attributes) {
      geometry.setAttribute(
        name,
        BufferAttribute.fromJSON(json.attributes[name])
      );
    }

    return geometry;
  }
}
