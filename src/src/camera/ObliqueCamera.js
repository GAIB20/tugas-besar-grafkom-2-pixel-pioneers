import { Matrix4 } from "../math/Matrix4.js";
import { OrthographicCamera } from "./OrthographicCamera.js";

export class ObliqueCamera extends OrthographicCamera {
  constructor(gl, left, right, bottom, top, zNear, zFar) {
    super(gl, left, right, bottom, top, zNear, zFar);
    this.theta = this.degToRad(30); 
    this.transform.translateZ = 10;
    this.computeProjectionMatrix();
  }

  setObliqueAngleDeg(value) {
    this.theta = this.degToRad(value);
    this.computeProjectionMatrix();
  }

  get type() {
    return "ObliqueCamera";
  }

  computeProjectionMatrix() {
    const d = [
      (this.right - this.left) / (2 * this.transform.translateZ / 600),
      (this.top - this.bottom) / (2 * this.transform.translateZ / 300),
      (this.right - this.left) / 2,
      (this.top - this.bottom) / 2,
    ];
    const border = [
        -(d[2] + d[0])/2,
        (d[2] + d[0])/2,  
        -(d[3] + d[1])/2,
        (d[3] + d[1])/2,  
    ]
    this._projectionMatrix = Matrix4.oblique(
            ...border, this.near, this.far,
            -this.theta, 0.5,
        );
    this._viewProjectionMatrix = Matrix4.inverse(this.transform.getLocalMatrix().data);
    this._viewProjectionMatrix = Matrix4.multiply(
      this._projectionMatrix.data,
      this._viewProjectionMatrix.data
    );
  }
}
