import { Component } from "./component.js";
import { Scene } from "./scene.js";

const Deserialize = json => {
    switch (json.type) {
        case "Component":
            return Component.fromJSON(json);
        case "Scene":
            return Scene.fromJSON(json);
        default:
            return null;
    }
}

export { Deserialize }