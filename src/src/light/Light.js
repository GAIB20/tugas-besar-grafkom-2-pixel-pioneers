import { Vector3 } from "../math/Vector3";
import { Color } from "../primitives/Color";
import { Component } from "../primitives/Component";

export class Light extends Component {
  constructor(color = new Color(1, 1, 1, 1), uniforms = {}) {
    super();
    this._uniforms = uniforms;
    this._uniforms["lightColor"] = color;
    this._color = color;
  }

  get color() {
    return this._color;
  }
  get uniforms() {
    return this._uniforms;
  }

  static fromJSON(json, light) {
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

    if (!light) {
      light = new Light(
        json.color,
        uniforms
      );
    } else {
      light.uniforms = uniforms;
    }

    return light;
  }

  toJSON(){
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
    }
  }
}
