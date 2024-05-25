import { DirectionalLight } from "./DirectionalLight";

const DeserializeLight = (json) => {
  switch (json.type) {
    case "DirectionalLight":
      return DirectionalLight.fromJSON(json);
    default:
      return null;
  }
};

export { DeserializeLight };
