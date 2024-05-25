import { Light } from "./Light";
import { Color } from "../primitives/Color";
import { Vector3 } from "../math/Vector3";

export class PointLight extends Light {
  constructor(position = new Vector3(), intensity = 1, color = new Color(1, 1, 1, 1), uniforms = {}) {
    super(color, uniforms);
    this._position = position;
    this._intensity = intensity;
  }

  get position() {
    return this._position;
  }

  get intensity() {
    return this._intensity;
  }

  static fromJSON(json, light) {
    const position = Vector3.fromJSON(json.position);
    const intensity = json.intensity;
    return super.fromJSON(json, light, position, intensity);
  }

  toJSON() {
    const json = super.toJSON();
    json.position = this._position.toJSON();
    json.intensity = this._intensity;
    return json;
  }
}
