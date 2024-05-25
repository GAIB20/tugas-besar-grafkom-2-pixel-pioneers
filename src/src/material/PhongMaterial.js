import { ShaderMaterial } from "./ShaderMaterial";
import { Color } from "../primitives/Color.js";

export class PhongMaterial extends ShaderMaterial {
  constructor(
    name,
    ambient = new Color(1, 1, 1, 1),
    diffuse = new Color(1, 1, 1, 1),
    specular = new Color(1, 1, 1, 1),
    shininess = 1
  ) {
    // Define vertex shader for phong material
    const vertex_shader = `
        attribute vec4 position;
        attribute vec4 color;
        attribute vec3 normal;
        varying vec3 v_normal, v_pos;
        uniform bool u_useVertexColors;

        uniform float u_shininess;
        uniform vec3 u_lightDirection;
        uniform vec3 u_cameraPosition;

        uniform vec4 u_ambientColor;
        uniform vec4 u_diffuseColor;
        uniform vec4 u_specularColor;
        varying vec4 v_color;

        uniform mat4 u_worldMatrix;
        uniform mat4 u_viewMatrix;

        void main() {
          gl_Position = u_viewMatrix * u_worldMatrix * position;
          v_pos = gl_Position.xyz / gl_Position.w;
          v_normal = mat3(u_worldMatrix) * normal;

          vec3 N = normalize(v_normal);
          vec3 L = -normalize(u_lightDirection - v_pos);
          vec3 H = normalize(L + normalize(u_cameraPosition));

          float lambertian = max(dot(N, L), 0.0);
          float specular = pow(max(dot(H, N), 0.0), u_shininess);

          v_color = vec4(0.2 * u_ambientColor.rgb * u_ambientColor.a +
            lambertian * u_diffuseColor.rgb * u_diffuseColor.a +
            specular * u_specularColor.rgb *  u_specularColor.a, 1.0);
          
          if (u_useVertexColors) {
            v_color = v_color * color;
          }
        }
        `;

    // Define fragment shader for phong material
    const fragment_shader = `
        precision mediump float;
        varying vec4 v_color;

        void main() {
          gl_FragColor = v_color;
        }
        `;

    // Add new attribute : ambient, diffuse, specular, shininess
    super(name, vertex_shader, fragment_shader, {
      ambientColor: ambient,
      diffuseColor: diffuse,
      specularColor: specular,
      shininess,
    });
  }

  get ambient() {
    return this.uniforms["ambientColor"];
  }

  get diffuse() {
    return this.uniforms["diffuseColor"];
  }

  get specular() {
    return this.uniforms["specularColor"];
  }

  get shininess() {
    return this.uniforms["shininess"];
  }

  set ambient(value) {
    this._uniforms["ambientColor"].setHex(value);
  }

  set diffuse(value) {
    this._uniforms["diffuseColor"].setHex(value);
  }

  set specular(value) {
    this._uniforms["specularColor"].setHex(value);
  }

  set shininess(value) {
    this._uniforms["shininess"] = value;
  }

  toJSON() {
    const data = super.toJSON();
    return {
      ...data,
      type: "PhongMaterial",
    };
  }

  static fromJSON(json, material = null) {
    if (!material) material = new PhongMaterial(json.name, json.ambient, json.diffuse, json.specular, json.shininess);
    super.fromJSON(json, material);

    return material;
  }
}
