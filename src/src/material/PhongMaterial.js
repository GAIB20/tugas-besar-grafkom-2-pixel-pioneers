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
    // // Define vertex shader for phong material
    // const vertex_shader = `
    //     attribute vec4 position;
    //     attribute vec4 color;
    //     attribute vec3 normal;
    //     varying vec3 v_normal, v_pos, v_direction;
    //     uniform bool u_useVertexColors;

    //     uniform float u_shininess;
    //     uniform vec3 u_lightDirection;
    //     uniform vec3 u_cameraPosition;

    //     uniform vec4 u_ambientColor;
    //     uniform vec4 u_diffuseColor;
    //     uniform vec4 u_specularColor;
    //     varying vec4 v_color;

    //     uniform mat4 u_worldMatrix;
    //     uniform mat4 u_viewMatrix;

    //     uniform sampler2D u_specularMap;
    //     uniform sampler2D u_diffuseMap;
    //     uniform sampler2D u_normalMap;

    //     void main() {
    //       gl_Position = u_viewMatrix * u_worldMatrix * position;
    //       v_pos = gl_Position.xyz / gl_Position.w;
    //       v_normal = mat3(u_worldMatrix) * normal;

    //       vec3 N = normalize(v_normal);
    //       vec3 L = -normalize(u_lightDirection - v_pos);
    //       vec3 H = normalize(L + normalize(u_cameraPosition));
    //       v_direction = reflect(normalize(v_pos - u_cameraPosition), N);

    //       float lambertian = max(dot(N, L), 0.0);
    //       float specular = pow(max(dot(H, N), 0.0), u_shininess);

    //       v_color = vec4(0.2 * u_ambientColor.rgb * u_ambientColor.a +
    //         lambertian * u_diffuseColor.rgb * u_diffuseColor.a +
    //         specular * u_specularColor.rgb *  u_specularColor.a, 1.0);

    //       if (u_useVertexColors) {
    //         v_color = v_color * color;
    //       }
    //     }
    //     `;

    // // Define fragment shader for phong material
    // const fragment_shader = `
    //     precision mediump float;
    //     varying vec4 v_color;

    //     // Passed in from the vertex shader.
    //     varying vec3 v_direction;

    //     // The texture.
    //     uniform samplerCube u_texture;
    //     uniform bool u_useEnvironmentMapping;

    //     void main() {
    //       if (u_useEnvironmentMapping) {
    //         gl_FragColor = textureCube(u_texture, v_direction);
    //       } else {
    //         gl_FragColor = v_color;
    //       }
    //     }
    //     `;

    // const vertex_shader = `
    //   attribute vec4 position;
    //   attribute vec3 tangent;
    //   attribute vec3 normal;
    //   attribute vec2 texcoord;

    //   uniform mat4 u_worldMatrix;
    //   uniform mat4 u_viewProjectionMatrix;
    //   uniform mat4 u_normalMatrix;
    //   uniform vec3 u_lightDirection;
    //   uniform vec3 u_cameraPosition;
    //   uniform sampler2D u_displacementMap;
    //   uniform float u_displacementFactor;

    //   varying vec3 v_lightDirection;
    //   varying vec3 v_cameraPosition;
    //   varying vec3 v_vertexPosition;
    //   varying vec2 v_texcoord;
    //   varying vec3 v_normal;

    //   void main() {
    //       mat3 normalMat = mat3(u_normalMatrix);

    //       vec3 T = normalize(normalMat * tangent); // Tangent
    //       vec3 N = normalize(normalMat * normal ); // Normal
    //       vec3 B = cross(N, T);                      // Bi-Tangent
    //       mat3 invTBN = mat3(
    //           vec3(T.x, B.x, N.x),
    //           vec3(T.y, B.y, N.y),
    //           vec3(T.z, B.z, N.z)
    //       );

    //       vec4 pos = u_worldMatrix * position;
    //       float d = texture2D(u_displacementMap, texcoord).r; // ambil channel r
    //       pos.xyz += d * u_displacementFactor * N; // p = p + d * f * n

    //       v_lightDirection = invTBN * u_lightDirection;
    //       v_cameraPosition = invTBN * u_cameraPosition;
    //       v_vertexPosition = invTBN * pos.xyz;
    //       v_texcoord = texcoord;
    //       v_normal = N;

    //       gl_Position = u_viewProjectionMatrix * pos;
    //   }
    // `;

    // Define vertex shader for phong material
    const vertex_shader = `
        attribute vec4 position;
        attribute vec4 color;
        attribute vec3 normal;
        attribute vec2 texcoord;
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

        uniform sampler2D u_displacementMap;
        uniform float u_displacementFactor;

        varying vec3 v_lightDirection;
        varying vec3 v_cameraPosition;
        varying vec3 v_vertexPosition;
        varying vec2 v_texcoord;
        varying vec3 v_normal;

        void main() {
          gl_Position = u_viewMatrix * u_worldMatrix * position;
          v_vertexPosition = gl_Position.xyz / gl_Position.w;
          v_normal = mat3(u_worldMatrix) * normal;
          v_color = color;
          v_lightDirection = u_lightDirection;
          v_cameraPosition = u_cameraPosition;
          v_texcoord = texcoord;
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

          if (u_useNormalMap) {
              N = texture2D(u_normalMap, v_texcoord).rgb;
              N = normalize(N * 2.0 - 1.0);
          } else {
              N = normalize(v_normal);
          }

          vec3 direction = reflect(normalize(v_vertexPosition - v_cameraPosition), N);
          vec4 ambient = u_ambientColor * u_lightColor * 0.2;

          if (u_useDiffuseMap) {
            diffuse =
              u_diffuseColor *
              max(dot(L, N), 0.0) *
              texture2D(u_diffuseMap, v_texcoord);
          } else {
            diffuse =
              u_diffuseColor *
              max(dot(L, N), 0.0);
          }

          if (u_useSpecularMap) {
            u_specularColor *
              pow(max(dot(N, H), 0.0), u_shininess) *
              texture2D(u_specularMap, v_texcoord);
          } else {
            u_specularColor *
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
