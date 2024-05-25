import { Vector3 } from "../math/Vector3";
import { Color } from "../primitives/Color";
import { Light } from "./Light";

export class DirectionalLight extends Light {
  constructor(color = new Color(1, 1, 1, 1), uniforms = {}, target = null) {
    super(color, uniforms);
    this.target = target;
    this._direction = new Vector3();
  }

  get direction() {
    if (this.target) {
      this._direction
        .set(
          this.target.worldPosition.x,
          this.target.worldPosition.y,
          this.target.worldPosition.z
        )
        .sub(this.worldPosition)
        .normalize();
    } else {
      this._direction
        .set(this.worldPosition.x, this.worldPosition.y, this.worldPosition.z)
        .mul(-1)
        .normalize();
    }
    return this._direction;
  }

  get uniforms() {
    return {
      ...super.uniforms,
      lightDirection: this.direction,
      lightIsDirectional: true,
    };
  }

  set uniforms(value) {
    this._uniforms = value;
  }

  toJSON() {
    const data = super.toJSON();
    return {
      ...data,
      target: this.target,
      direction: this.direction,
      type: "DirectionalLight",
    };
  }

  static fromJSON(json, light = null) {
    const uniforms = {};
    for (const key in json.uniforms) {
      const uniform = json.uniforms[key];
      if (uniform[0] === "Vector3") {
        uniforms[key] = Vector3.fromJSON(uniform[1]);
      } else if (uniform[0] === "Color") {
        uniforms[key] = Color.fromJSON(uniform[1]);
      } else {
        uniforms[key] = uniform;
      }
    }

    if (!light) light = new DirectionalLight(json.color, uniforms);
    super.fromJSON(json, light);

    return light;
  }
}
