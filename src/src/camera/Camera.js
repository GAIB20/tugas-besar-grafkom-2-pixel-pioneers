import { Matrix } from "../math/Matrix.js";
import { Matrix4 } from "../math/Matrix4.js";

export class Camera {
  constructor(cameraAngleDeg, radius) {
    this._cameraAngleRadians = this.degToRad(cameraAngleDeg);
    this._projectionMatrix = Matrix.identity();
    this._cameraMatrix = Matrix.identity();
    this._viewProjectionMatrix = Matrix.identity();
    this.radius = radius;
  }

  degToRad(d) {
    return (d * Math.PI) / 180;
  }

  get viewProjectionMatrix() {
    this._cameraMatrix = Matrix4.yRotation(this._cameraAngleRadians);
    this._cameraMatrix = Matrix4.translate(
      this._cameraMatrix.data,
      0,
      0,
      this.radius * 1.5
    );
    var cameraPosition = [
      this._cameraMatrix.data[12],
      this._cameraMatrix.data[13],
      this._cameraMatrix.data[14],
    ];
    var up = [0, 1, 0];
    var fPosition = [0, 0, 0];
    this._cameraMatrix = Matrix4.lookAt(cameraPosition, fPosition, up);
    this._viewProjectionMatrix = Matrix4.inverse(this._cameraMatrix.data);
    this._viewProjectionMatrix = Matrix4.multiply(
      this._projectionMatrix.data,
      this._viewProjectionMatrix.data
    );
    return this._viewProjectionMatrix;
  }

  get projectionMatrix() {
    return this._projectionMatrix.data;
  }

  get cameraAngleRadians() {
    return this._cameraAngleRadians;
  }

  set cameraAngleDeg(value) {
    this._cameraAngleRadians = this.degToRad(value);
  }

  computeProjectionMatrix() {
    throw new Error(
      "Camera.computeProjectionMatrix() must be implemented in derived classes."
    );
  }
}
