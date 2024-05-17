import { ShaderMaterial } from "./ShaderMaterial";
import { Color } from "../primitives/Color.js";

export class BasicMaterial extends ShaderMaterial {
  constructor(name, color = new Color(1, 1, 1, 1)) {
    // Define vertex shader for basic material
    const vertex_shader = `
        attribute vec4 position;
        attribute vec4 color;

        uniform mat4 u_worldMatrix;
        uniform mat4 u_viewMatrix;
        uniform vec4 u_color;

        varying vec4 v_color;

        void main() {
            vec4 wPos = u_viewMatrix * u_worldMatrix * position;
            gl_Position = wPos;
            v_color = mix(vec4(1,1,1,1), color, 0.0) * u_color;
        }
        `;

    // Define fragment shader for basic material
    const fragment_shader = `
        precision highp float;
        varying vec4 v_color;

        void main() {
            gl_FragColor = v_color;
        }
        `;

    // Add new attribute : color
    super(name, vertex_shader, fragment_shader, {
      color: color,
    });

    this._color = color;
  }

  get color() {
    return this._color;
  }

  toJSON() {
    const data = super.toJSON();
    return {
      ...data,
      color: this._color,
      type: "BasicMaterial",
    };
  }

  static fromJSON(json, material = null) {
    if (!material) material = new BasicMaterial(json.name, json.color);
    super.fromJSON(json, material);

    return material;
  }
}
