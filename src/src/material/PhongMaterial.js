import { ShaderMaterial } from "./ShaderMaterial";
import { Color } from "../primitives/Color.js";

export class PhongMaterial extends ShaderMaterial {
  constructor(
    name,
    ambientColor = new Color(1, 1, 1, 1),
    diffuseColor = new Color(1, 1, 1, 1),
    specularColor = new Color(1, 1, 1, 1),
    shininess = 1
  ) {
    // Define vertex shader for phong material
    const vertex_shader = `
        attribute vec4 position;
        attribute vec4 color;
        attribute vec3 normal;
        attribute vec2 texcoord;
        uniform bool u_useVertexColors;
        uniform bool u_useDisplacementMap;
        uniform bool u_useTextureMapping;

        uniform float u_shininess;
        uniform vec3 u_lightDirection;
        uniform vec3 u_cameraPosition;

        uniform vec4 u_ambientColor;
        uniform vec4 u_diffuseColor;
        uniform vec4 u_specularColor;
        varying vec4 v_color;

        uniform mat4 u_worldMatrix;
        uniform mat4 u_viewMatrix;

        uniform sampler2D u_displacementMap;
        uniform float u_displacementFactor;

        varying vec3 v_lightDirection;
        varying vec3 v_cameraPosition;
        varying vec3 v_vertexPosition;
        varying vec2 v_texcoord;
        varying vec3 v_normal;

        void main() {
          v_normal = mat3(u_worldMatrix) * normal;
          vec4 pos = u_worldMatrix * position;
          float d = texture2D(u_displacementMap, texcoord).r;
          pos.xyz += d * u_displacementFactor * v_normal;

          if (u_useDisplacementMap && u_useTextureMapping) {
            gl_Position = u_viewMatrix * pos;
          } else {
            gl_Position = u_viewMatrix * u_worldMatrix * position;
          }

          v_color = color;
          v_lightDirection = u_lightDirection;
          v_cameraPosition = u_cameraPosition;
          v_texcoord = texcoord;
          v_vertexPosition = gl_Position.xyz / gl_Position.w;
        }
        `;

    const fragment_shader = `
      precision highp float;

      uniform sampler2D u_normalMap;
      uniform bool u_useNormalMap;
      uniform vec4 u_ambientColor;
      uniform vec4 u_lightColor;
      uniform sampler2D u_diffuseMap;
      uniform bool u_useDiffuseMap;
      uniform vec4 u_diffuseColor;
      uniform sampler2D u_specularMap;
      uniform bool u_useSpecularMap;
      uniform vec4 u_specularColor;
      uniform float u_shininess;
      uniform bool u_useVertexColors;
      uniform bool u_useEnvironmentMapping;
      uniform bool u_useTextureMapping;
      uniform samplerCube u_environmentMap;

      varying vec3 v_lightDirection;
      varying vec3 v_cameraPosition;
      varying vec3 v_vertexPosition;
      varying vec2 v_texcoord;
      varying vec3 v_normal;
      varying vec4 v_color;

      void main() {
          vec3 L = -normalize(v_lightDirection - v_vertexPosition);
          vec3 V = normalize(v_cameraPosition);
          vec3 H = normalize(L + V);
          vec3 N;
          vec4 diffuse;
          vec4 specular;

          if (u_useNormalMap && u_useTextureMapping) {
              N = texture2D(u_normalMap, v_texcoord).rgb;
              N = normalize(N * 2.0 - 1.0);
          } else {
              N = normalize(v_normal);
          }

          vec3 direction = reflect(normalize(v_vertexPosition - v_cameraPosition), N);
          vec4 ambient = u_ambientColor * u_lightColor * 0.3;

          if (u_useDiffuseMap && u_useTextureMapping) {
            diffuse =
              u_diffuseColor *
              max(dot(L, N), 0.0) *
              texture2D(u_diffuseMap, v_texcoord);
          } else {
            diffuse =
              u_diffuseColor *
              max(dot(L, N), 0.0);
          }

          if (u_useSpecularMap && u_useTextureMapping) {
            specular = u_specularColor *
              pow(max(dot(N, H), 0.0), u_shininess) *
              texture2D(u_specularMap, v_texcoord);
          } else {
            specular = u_specularColor *
              pow(max(dot(N, H), 0.0), u_shininess);
          }

          float attenuation = 1.0;

          if (u_useEnvironmentMapping) {
            gl_FragColor = textureCube(u_environmentMap, direction);
          } else {
            gl_FragColor = attenuation * (diffuse + specular) + ambient;
          }

          if (u_useVertexColors) {
            gl_FragColor = gl_FragColor * v_color;
          }
      }
    `;

    const uniforms = {
      ambientColor: ambientColor,
      diffuseColor: diffuseColor,
      specularColor: specularColor,
      shininess,
    };

    super(name, vertex_shader, fragment_shader, uniforms);
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
    if (!material)
      material = new PhongMaterial(
        json.name,
        json.ambient,
        json.diffuse,
        json.specular,
        json.shininess
      );
    super.fromJSON(json, material);

    return material;
  }
}
