import { Component } from "./Component.js";
import { Scene } from "./Scene.js";
import { Mesh } from "./Mesh.js";

window.DeserializePrimitive = function(json) {
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
