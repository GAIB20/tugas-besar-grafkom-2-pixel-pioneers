import { Matrix } from "./matrix.js";

export class Matrix4 extends Matrix {
  constructor(data) {
    if (data.length !== 16) throw new Error("Matrix4 must have 16 elements");
    super(data, 4, 4);
  }

  static identity() {
    return new Matrix4([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  static ortographic(left, right, bottom, top, near, far) {

  }

  static oblique(left, right, bottom, top, near, far, angle, scale=0.5, zoom=1.0) {
    angle *= Math.PI / 180;
    const d = [
        (right - left) / (2 * zoom),
        (top - bottom) / (2 * zoom),
        (right - left) / 2,
        (top - bottom) / 2,
    ];
    const border = [
        -(d[2] + d[0])/2,
        (d[2] + d[0])/2,
        -(d[3] + d[1])/2,
        (d[3] + d[1])/2,
    ];
    return Matrix4.premul(
        Matrix4.orthographic(...border, near, far),
        new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            -scale * Math.cos(angle), scale * Math.sin(angle), 1, 0,
            0, 0, 0, 1,
        ]),
    );
}

}
