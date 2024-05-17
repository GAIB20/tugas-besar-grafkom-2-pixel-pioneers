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
        attribute vec4 position;
        attribute vec4 color;
        attribute vec3 normal;

        uniform mat4 u_worldMatrix;
        uniform mat4 u_viewMatrix;
        uniform vec2 u_resolution;
        uniform bool u_useVertexColors;

        varying vec4 v_color;
        varying vec3 v_normal, v_pos;

        void main() {
            gl_Position = u_viewMatrix * u_worldMatrix * position;

            v_pos = gl_Position.xyz / gl_Position.w;
            v_normal = mat3(u_worldMatrix) * normal;
            v_color = mix(vec4(1,1,1,1), color, float(u_useVertexColors));
        }
        `;

    // Define fragment shader for phong material
    const fragment_shader = `
        precision mediump float;

        uniform float u_shininess;
        uniform vec3 u_cameraPosition;
        uniform vec4 u_ambientColor;
        uniform vec4 u_diffuseColor;
        uniform vec4 u_specularColor;

        varying vec4 v_color;
        varying vec3 v_normal, v_pos;

        void main() {
            vec3 N = normalize(v_normal);
            vec3 H = normalize(normalize(u_cameraPosition));

            float kDiff = max(dot(-N, H), 0.0); // Removed light position
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
