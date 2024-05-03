import { BufferGeometry } from "../geometry/BufferGeometry";
import { ShaderMaterial } from "../material/ShaderMaterial";

class Mesh extends Node {
    geometry: BufferGeometry
    material: ShaderMaterial


    constructor(geometry: BufferGeometry, material: ShaderMaterial) {
        super();
        this.geometry = geometry;
        this.material = material;
    }
}
