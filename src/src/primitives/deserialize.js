import { Component } from "./Component.js";
import { Scene } from "./Scene.js";

const Deserialize = (json) => {
  switch (json.type) {
    case "Component":
      return Component.fromJSON(json);
    case "Scene":
      return Scene.fromJSON(json);
    default:
      return null;
  }
};

export { Deserialize };
