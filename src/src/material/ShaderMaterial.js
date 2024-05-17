import { Vector3 } from "../math/Vector3";
import { Color } from "../primitives/Color";

export class ShaderMaterial {
  constructor(
    name = "",
    vertexShader = "",
    fragmentShader = "",
    uniforms = {}
  ) {
    this.id = Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    this._name = name;
    this._vertexShader = vertexShader;
    this._fragmentShader = fragmentShader;
    this._uniforms = uniforms;
  }

  get vertexShader() {
    return this._vertexShader;
  }

  get fragmentShader() {
    return this._fragmentShader;
  }

  get uniforms() {
    return this._uniforms;
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
      vertexShader: this._vertexShader,
      fragmentShader: this._fragmentShader,
      uniforms,
      type: "ShaderMaterial",
      name: this._name,
    };
  }

  static fromJSON(json, material = null) {
    const uniforms = {};

    for (const key in json.uniforms) {
      const [uniformType, uniformValue] = json.uniforms[key];

      if (uniformType === "Vector3") {
        uniforms[key] = Vector3.fromJSON(uniformValue);
      } else if (uniformType === "Color") {
        uniforms[key] = Color.fromJSON(uniformValue);
      } else {
        uniforms[key] = uniformValue;
      }
    }

    if (!material) {
      material = new ShaderMaterial(
        json.name,
        json.vertexShader,
        json.fragmentShader,
        uniforms
      );
    } else {
      material.uniforms = uniforms;
    }

    return material;
  }
}
