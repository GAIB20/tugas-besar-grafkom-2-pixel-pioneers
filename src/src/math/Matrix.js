export class Matrix {
  constructor(
    data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    m = 4,
    n = 4
  ) {
    this.data = data;
    this.m = m;
    this.n = n;
  }

  static identity() {
    return new Matrix();
  }

  clone() {
    return new Matrix(this.data.slice(), this.m, this.n);
  }

  get(i, j) {
    if (i < 0 || i >= this.m || j < 0 || j >= this.n)
      throw new Error("Index out of range.");
    return this.data[i * this.n + j];
  }

  static mul(...matrices) {
    if (matrices.length === 0) {
      return Matrix.identity();
    }

    let result = matrices[0].clone();

    if (result.m != result.n) {
      throw new Error("Matrix is not square!");
    }

    for (let m = 1; m < matrices.length; m++) {
      let currentMatrix = matrices[m];

      if (result.m != currentMatrix.m || result.n != currentMatrix.n) {
        throw new Error("Matrix mismatch!");
      }

      let newResult = new Matrix(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        4,
        4
      );

      for (let i = 0; i < result.n; i++) {
        for (let j = 0; j < result.n; j++) {
          newResult.data[i * result.n + j] = 0;
          for (let k = 0; k < result.n; k++) {
            newResult.data[i * result.n + j] +=
              result.data[i * result.n + k] *
              currentMatrix.data[k * result.n + j];
          }
        }
      }

      result = newResult;
    }

    return result;
  }

  static premul(other) {
    return Matrix.mul(other, this);
  }

  static translation3d(v) {
    const m = Matrix.identity();
    m.data[3 * m.n + 0] = v.x;
    m.data[3 * m.n + 1] = v.y;
    m.data[3 * m.n + 2] = v.z;
    return m;
  }

  static rotation3d(vector) {
    const matrix = Matrix.identity();
    const { x: angleX, y: angleY, z: angleZ } = vector;

    const cosX = Math.cos(angleX);
    const cosY = Math.cos(angleY);
    const cosZ = Math.cos(angleZ);
    const sinX = Math.sin(angleX);
    const sinY = Math.sin(angleY);
    const sinZ = Math.sin(angleZ);

    matrix.data = [
      cosY * cosZ,
      cosY * sinZ,
      -sinY,
      0,
      sinX * sinY * cosZ - cosX * sinZ,
      sinX * sinY * sinZ + cosX * cosZ,
      sinX * cosY,
      0,
      cosX * sinY * cosZ + sinX * sinZ,
      cosX * sinY * sinZ - sinX * cosZ,
      cosX * cosY,
      0,
      0,
      0,
      0,
      1,
    ];

    return matrix;
  }

  static scale3d(v) {
    const m = Matrix.identity();
    m.data[0] = v.x;
    m.data[1 * m.n + 1] = v.y;
    m.data[2 * m.n + 2] = v.z;
    return m;
  }

  toArray() {
    return this.data;
  }
}
