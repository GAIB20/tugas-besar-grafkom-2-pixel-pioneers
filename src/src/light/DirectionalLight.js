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
        .set(
          this.target.worldPosition.x,
          this.target.worldPosition.y,
          this.target.worldPosition.z
        )
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
}
