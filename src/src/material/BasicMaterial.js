import { ShaderMaterial } from "./ShaderMaterial";
import { Color } from "../primitives/Color.js";

export class BasicMaterial extends ShaderMaterial {
  constructor(name, color = new Color(1, 1, 1, 1)) {
    // Define vertex shader for basic material
    const vertex_shader = `
        attribute vec4 position;
        attribute vec3 normal;
        attribute vec4 color;

        uniform mat4 u_worldMatrix;
        uniform mat4 u_viewMatrix;
        uniform vec4 u_color;
        uniform bool u_useVertexColors;
        uniform vec3 u_cameraPosition;

        varying vec4 v_color;
        varying vec3 v_cameraPosition;
        varying vec3 v_vertexPosition;
        varying vec3 v_normal;

        void main() {
            vec4 wPos = u_viewMatrix * u_worldMatrix * position;
            gl_Position = wPos;
            v_cameraPosition = u_cameraPosition;
            v_vertexPosition = gl_Position.xyz / gl_Position.w;
            v_normal = mat3(u_worldMatrix) * normal;

            if (u_useVertexColors) {
              v_color = color;
            } else {
              v_color = u_color;
            }
        }
        `;

    // Define fragment shader for basic material
    const fragment_shader = `
        precision highp float;
        uniform vec4 u_lightColor;
        varying vec4 v_color;

        varying vec3 v_cameraPosition;
        varying vec3 v_vertexPosition;
        varying vec3 v_normal;
        uniform bool u_useEnvironmentMapping;
        uniform samplerCube u_environmentMap;

        void main() {
          if (u_useEnvironmentMapping) {
            vec3 N = normalize(v_normal);
            vec3 direction = reflect(normalize(v_vertexPosition - v_cameraPosition), N);

            gl_FragColor = textureCube(u_environmentMap, direction);
          } else {
            gl_FragColor = v_color * u_lightColor;
          }
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

  set color(value) {
    this._color.setHex(value);
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
    if (!material) material = new BasicMaterial(json.name, Color.fromJSON(json.color));
    super.fromJSON(json, material);

    return material;
  }
}
