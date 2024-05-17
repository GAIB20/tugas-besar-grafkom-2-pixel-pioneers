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

  static rotation3d(v) {
    const m = Matrix.identity();
    const { x, y, z } = v;

    // Rotation around x-axis
    m.data[5] = Math.cos(x);
    m.data[6] = -Math.sin(x);
    m.data[9] = Math.sin(x);
    m.data[10] = Math.cos(x);

    // Rotation around y-axis
    m.data[0] = Math.cos(y);
    m.data[2] = Math.sin(y);
    m.data[8] = -Math.sin(y);
    m.data[10] = Math.cos(y);

    // Rotation around z-axis
    m.data[0] = Math.cos(z);
    m.data[1] = -Math.sin(z);
    m.data[4] = Math.sin(z);
    m.data[5] = Math.cos(z);

    return m;
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
