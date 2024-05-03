export class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.set(x, y, z, w);
    }

    set(x, y, z, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }
}
