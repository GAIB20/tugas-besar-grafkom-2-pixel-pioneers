import { Component } from "./Component.js";
import { Scene } from "./Scene.js";
import { Mesh } from "./mesh.js";

const Deserialize = (json) => {
  switch (json.type) {
    case "Component":
      return Component.fromJSON(json);
    case "Scene":
      return Scene.fromJSON(json);
    case "Mesh":
      return Mesh.fromJSON(json);
    default:
      return null;
  }
};

export { Deserialize };
