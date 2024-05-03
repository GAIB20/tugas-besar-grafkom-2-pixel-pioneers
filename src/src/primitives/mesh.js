import { BufferGeometry } from "../../geometry/BufferGeometry.js";
import { ShaderMaterial } from "../../material/ShaderMaterial.js";

class Mesh extends Node {
    constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
    }
}

export { Mesh };
