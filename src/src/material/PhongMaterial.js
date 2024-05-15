import { ShaderMaterial } from "./ShaderMaterial";
import { Color } from "../primitives/Color.js";

export class PhongMaterial extends ShaderMaterial {
  constructor(
    name,
    ambient = new Color(1, 1, 1, 1),
    diffuse = new Color(1, 1, 1, 1),
    specular = new Color(1, 1, 1, 1),
    shininess = 30
  ) {
    // Define vertex shader for phong material
    const vertex_shader = `
        #define PI 3.1415926535897932384626433832795
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec3 a_normal;

        uniform mat4 u_worldMatrix;
        uniform mat4 u_viewMatrix;
        uniform vec2 u_resolution;
        uniform bool u_useVertexColor;

        varying vec4 v_color;
        varying vec3 v_normal, v_pos;

        void main() {
            gl_Position = u_viewMatrix * u_worldMatrix * a_position;

            v_pos = gl_Position.xyz / gl_Position.w;
            v_normal = mat3(u_worldMatrix) * a_normal;
            v_color = mix(vec4(1,1,1,1), a_color, float(u_useVertexColor));
        }
        `;

    // Define fragment shader for phong material
    const fragment_shader = `
        precision mediump float;

        uniform float u_shininess;
        uniform vec3 u_lightPosition;
        uniform vec3 u_cameraPosition;
        uniform vec4 u_ambientColor;
        uniform vec4 u_diffuseColor;
        uniform vec4 u_specularColor;

        varying vec4 v_color;
        varying vec3 v_normal, v_pos;

        void main() {
            vec3 N = normalize(v_normal);
            vec3 L = normalize(normalize(u_lightPosition) - v_pos);
            vec3 H = normalize(L + normalize(u_cameraPosition));

            float kDiff = max(dot(L, N), 0.0);
            vec3 diffuse = kDiff * u_diffuseColor.rgb;

            float kSpec = pow(max(dot(N, H), 0.0), u_shininess);
            vec3 specular = kSpec * u_specularColor.rgb;

            gl_FragColor = v_color * vec4(
                0.1 * u_ambientColor.a * u_ambientColor.rgb + 
                u_diffuseColor.a * diffuse +
                u_specularColor.a * specular
            , 1.0);
        }
        `;

    // Add new attribute : ambient, diffuse, specular, shininess
    super(name, vertex_shader, fragment_shader, {
      ambient,
      diffuse,
      specular,
      shininess,
    });
  }

  get ambient() {
    return this.uniforms["ambient"];
  }

  get diffuse() {
    return this.uniforms["diffuse"];
  }

  get specular() {
    return this.uniforms["specular"];
  }

  get shininess() {
    return this.uniforms["shininess"];
  }

  toJSON() {
    const data = super.toJSON();
    return {
      ...data,
      type: "PhongMaterial",
    };
  }

  static fromJSON(json, material = null) {
    if (!material) material = new PhongMaterial(json.name);
    super.fromJSON(json, material);

    return material;
  }
}
