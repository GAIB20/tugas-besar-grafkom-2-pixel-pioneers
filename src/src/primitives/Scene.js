import { Component } from "./Component.js";
import { Color } from "./Color.js";

export class Scene extends Component {
  backgroundColor;

  constructor() {
    super();
    this.backgroundColor = new Color();
  }

  get type() {
    return "Scene";
  }

  set backgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      backgroundColor: this.backgroundColor.toJSON(),
      type: "Scene",
    };
  }

  static fromJSON(json, obj = null) {
    if (!obj) obj = new Scene();
    super.fromJSON(json, obj);
    return obj;
  }
}
