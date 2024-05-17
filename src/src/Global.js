import * as DeserializePrimitive from "./primitives/Deserialize.js";

globalThis.Global = {
  ...DeserializePrimitive,
};

export default globalThis.Global;
