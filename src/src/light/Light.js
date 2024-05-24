import { Color } from "../primitives/Color";
import { Component } from "../primitives/Component";

export class Light extends Component {
  constructor(color = new Color(1, 1, 1, 1), uniforms = {}) {
    super();
    this._uniforms = uniforms;
    this._uniforms["lightColor"] = color;
    this._color = color;
  }

  get color() {
    return this._color;
  }
  get uniforms() {
    return this._uniforms;
  }
}
