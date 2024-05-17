import { BoxGeometry } from "./BoxGeometry";
import { BufferAttribute } from "./BufferAttribute";
import { BufferGeometry } from "./BufferGeometry";
import { Geometry } from "./Geometry";
import { PlaneGeometry } from "./PlaneGeometry";

const DeserializeGeometry = (json) => {
  switch (json.type) {
    case "BufferGeometry":
      return BufferGeometry.fromJSON(json);
    case "BufferAttribute":
      return BufferAttribute.fromJSON(json);
    case "BoxGeometry":
      return BoxGeometry.fromJSON(json);
    case "PlaneGeometry":
      return PlaneGeometry.fromJSON(json);
    case "Geometry":
      return Geometry.fromJSON(json);
    default:
      return null;
  }
};

export { DeserializeGeometry };
