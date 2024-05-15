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
        
        `;

    // Define fragment shader for phong material
    const fragment_shader = `
        
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
}
