export class Vector2 {
    constructor(public x: number = 0, public y: number = 0) {}

    set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;
        return this;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}
