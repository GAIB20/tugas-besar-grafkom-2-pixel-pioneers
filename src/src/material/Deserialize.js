import { BasicMaterial } from "./BasicMaterial";
import { PhongMaterial } from "./PhongMaterial";
import { ShaderMaterial } from "./ShaderMaterial";

const DeserializeMaterial = (json) => {
  switch (json.type) {
    case "BasicMaterial":
      return BasicMaterial.fromJSON(json);
    case "ShaderMaterial":
      return ShaderMaterial.fromJSON(json);
    case "PhongMaterial":
      return PhongMaterial.fromJSON(json);
    default:
      return null;
  }
};

export { DeserializeMaterial };
