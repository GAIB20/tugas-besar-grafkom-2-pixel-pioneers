import { Matrix } from "./matrix";

export class Matrix4 extends Matrix {
    constructor(data: number[][]) {
        if (data.length !== 16) throw new Error("Matrix4 must have 16 elements");
        super(data, 4, 4);
    }

    static identity() {
        return new Matrix4([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }
}