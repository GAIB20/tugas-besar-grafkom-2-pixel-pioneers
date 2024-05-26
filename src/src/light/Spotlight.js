import { Vector3 } from "../math/Vector3";
import { Color } from "../primitives/Color";
import { Light } from "./Light"; // Assuming Light is in the same folder

export class Spotlight extends Light {
  constructor(color = new Color(1, 0, 0, 1), position = new Vector3(0, 0, 0), direction = new Vector3(0, -1, 0), cutoff = Math.cos(Math.PI / 6), uniforms = {}) {
    super(color, uniforms);
    this._uniforms["spotlightPosition"] = position;
    this._uniforms["spotlightDirection"] = direction;
    this._uniforms["spotlightCutoff"] = cutoff;
    this._position = position;
    this._direction = direction;
    this._cutoff = cutoff;
  }

  get position() {
    return this._position;
  }

  get direction() {
    return this._direction;
  }

  get cutoff() {
    return this._cutoff;
  }

  static fromJSON(json, spotlight) {
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

    if (!spotlight) {
      spotlight = new Spotlight(
        Color.fromJSON(json.color),
        uniforms.spotlightPosition,
        uniforms.spotlightDirection,
        uniforms.spotlightCutoff,
        uniforms
      );
    } else {
      spotlight._uniforms = uniforms;
      spotlight._position = uniforms.spotlightPosition;
      spotlight._direction = uniforms.spotlightDirection;
      spotlight._cutoff = uniforms.spotlightCutoff;
    }

    return spotlight;
  }

  toJSON() {
    const uniforms = {};

    for (const key in this._uniforms) {
      const uniform = this._uniforms[key];
      let uniformValue;

      if (uniform instanceof Vector3 || uniform instanceof Color) {
        uniformValue = [uniform.constructor.name, uniform.toJSON()];
      } else {
        uniformValue = uniform;
      }

      uniforms[key] = uniformValue;
    }

    return {
      uniforms,
      color: this._color
    };
  }
}
