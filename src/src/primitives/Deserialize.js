import { Component } from "./Component.js";
import { Scene } from "./Scene.js";
import { Mesh } from "./Mesh.js";
import { ArticulatedModel } from "./ArticulatedModel.js";
import { Rig } from "./Rig.js";

window.DeserializePrimitive = function (json) {
  switch (json.type) {
    case "ArticulatedModel":
      return ArticulatedModel.fromJSON(json);
    case "Rig":
      return Rig.fromJSON(json);
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
