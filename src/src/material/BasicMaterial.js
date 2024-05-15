import { ShaderMaterial } from "./ShaderMaterial";
import { Color } from "../primitives/Color.js";

export class BasicMaterial extends ShaderMaterial {
  constructor(name, color = new Color(1, 1, 1, 1)) {
    // Define vertex shader for basic material
    const vertex_shader = `
        
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
}
