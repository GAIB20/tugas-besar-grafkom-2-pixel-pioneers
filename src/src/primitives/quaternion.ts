export class Quaternion {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {
        this.set(x, y, z, w);
    }

    set(x: number, y: number, z: number, w: number = 1): Quaternion {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }
}