import { Matrix } from "../math/Matrix.js";
import { Matrix4 } from "../math/Matrix4.js";

export class Camera {
  constructor(radius) {
    this._projectionMatrix = Matrix4.identity();
    this._viewProjectionMatrix = Matrix4.identity();
    this._cameraMatrix = Matrix4.identity();
    this._radius = radius;
  }

  get viewProjectionMatrix() {
    return this._viewProjectionMatrix;
  }

  get projectionMatrix() {
    return this._projectionMatrix.data;
  }

  set radiusDeg(value) {
    this._radius = value;
    this.computeProjectionMatrix();
  }

  degToRad(d) {
    return (d * Math.PI) / 180;
  }

  computeProjectionMatrix() {
    throw new Error(
      "Camera.computeProjectionMatrix() must be implemented in derived classes."
    );
  }
}
