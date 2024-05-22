import { DeserializeGeometry } from "../geometry/Deserialize";
import { DeserializeMaterial } from "../material/Deserialize";
import { Component } from "./Component";

class Mesh extends Component {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }

  get type() { 
    return "Mesh"; 
  }

  set type(type) {
    this._type = type;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      geometry: this.geometry,
      material: this.material,
      // type: "Mesh",
    };
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new Mesh();
    super.fromJSON(json, obj);
    obj.type = json.type;
    obj.geometry = DeserializeGeometry(json.geometry);
    if (json.material) {
      obj.material = DeserializeMaterial(json.material);
    }
    return obj;
  }
}

export { Mesh };
