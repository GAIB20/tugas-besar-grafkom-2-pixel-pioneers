import { Component } from "./Component.js";
import { Scene } from "./Scene.js";
import { Mesh } from "./Mesh.js";
import { ArticulatedModel } from "./ArticulatedModel.js";
import { Rig } from "./Rig.js";
import { DirectionalLight } from "../light/DirectionalLight.js";

window.DeserializePrimitive = function (json) {
  switch (json.type) {
    case "Component":
      return Component.fromJSON(json);
    case "Mesh":
      return Mesh.fromJSON(json);
    case "Scene":
      return Scene.fromJSON(json);
    case "Rig":
      return Rig.fromJSON(json);
    case "ArticulatedModel":
      return ArticulatedModel.fromJSON(json);
    case "DirectionalLight":
      return DirectionalLight.fromJSON(json);
    default:
      return null;
  }
};
