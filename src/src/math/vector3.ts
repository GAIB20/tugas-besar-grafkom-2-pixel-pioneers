export class Vector3 {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

    set(x: number, y: number, z: number): Vector3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
}
