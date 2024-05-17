import { DeserializeGeometry } from "../geometry/Deserialize";
import { DeserializeMaterial } from "../material/Deserialize";
import { Component } from "./Component";

class Mesh extends Component {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      geometry: this.geometry,
      material: this.material,
      type: "Mesh",
    };
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new Mesh();
    super.fromJSON(json, obj);
    obj.geometry = DeserializeGeometry(json.geometry);
    obj.material = DeserializeMaterial(json.material);
    return obj;
  }
}

export { Mesh };
