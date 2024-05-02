import { Vector3 } from "./vector3";

export class Matrix {
    private data: number[][];

    constructor(data?: number[][]) {
        this.data = data ?? [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    static identity(): Matrix {
        return new Matrix();
    }

    clone(): Matrix {
        const newData = this.data.map(row => row.slice());
        return new Matrix(newData);
    }

    static mul(...matrices: Matrix[]): Matrix {
        if (matrices.length === 0) {
            return Matrix.identity();
        }

        let result = matrices[0].clone();

        for (let m = 1; m < matrices.length; m++) {
            let currentMatrix = matrices[m];
            let newResult = new Matrix([
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    newResult.data[i][j] = 0;
                    for (let k = 0; k < 4; k++) {
                        newResult.data[i][j] += result.data[i][k] * currentMatrix.data[k][j];
                    }
                }
            }

            result = newResult;
        }

        return result;
    }

    static inv(matrix: Matrix): Matrix {
        const m = matrix.data;
        const inv = new Array(4).fill(0).map(() => new Array(4).fill(0));
        const det = Matrix.determinant(matrix);
        if (det === 0) {
            throw new Error("Matrix is not invertible");
        }

        // Calculate the cofactor matrix
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                // Minor of m[row][col]
                let minor = Matrix.minor(m, row, col);
                // Cofactor equals the determinant of the minor matrix, adjusted by sign
                let cofactor = ((row + col) % 2 === 0 ? 1 : -1) * Matrix.determinant(new Matrix(minor));
                // Assign to adjugate matrix (transpose of cofactor matrix)
                inv[col][row] = cofactor / det;
            }
        }

        return new Matrix(inv);
    }

    private static minor(m: number[][], row: number, col: number): number[][] {
        return m.filter((_, r) => r !== row).map(row => row.filter((_, c) => c !== col));
    }

    private static determinant(m: Matrix): number {
        const d = m.data;
        if (d.length === 2) {
            return d[0][0] * d[1][1] - d[0][1] * d[1][0];
        }
        let det = 0;
        for (let i = 0; i < d[0].length; i++) {
            det += d[0][i] * ((i % 2 === 0 ? 1 : -1) * Matrix.determinant(new Matrix(Matrix.minor(d, 0, i))));
        }
        return det;
    }

    premul(other: Matrix): Matrix {
        return Matrix.mul(other, this);
    }

    static translation3d(v: Vector3): Matrix {
        const m = Matrix.identity();
        m.data[0][3] = v.x;
        m.data[1][3] = v.y;
        m.data[2][3] = v.z;
        return m;
    }

    static rotation3d(v: Vector3): Matrix {
        // Placeholder for actual rotation logic
        const m = Matrix.identity();
        // Rotation logic would be implemented here
        return m;
    }

    static scale3d(v: Vector3): Matrix {
        const m = Matrix.identity();
        m.data[0][0] = v.x;
        m.data[1][1] = v.y;
        m.data[2][2] = v.z;
        return m;
    }
}
