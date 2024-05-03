export class Euler {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public order: string = 'XYZ') {
        this.set(x, y, z, order);
    }

    set(x: number, y: number, z: number, order: string = 'XYZ'): Euler {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
        return this;
    }

    clone(): Euler {
        return new Euler(this.x, this.y, this.z, this.order);
    }
}