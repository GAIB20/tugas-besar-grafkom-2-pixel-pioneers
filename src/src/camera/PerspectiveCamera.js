import { Matrix4 } from "../math/Matrix4.js";
import { Camera } from "./Camera.js";

export class PerspectiveCamera extends Camera {
  constructor(gl, fieldOfViewDeg, cameraAngleDeg, radius, zNear, zFar) {
    super(radius);
    this._cameraAngleRadians = this.degToRad(cameraAngleDeg);
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    this.fieldOfViewRadians = this.degToRad(fieldOfViewDeg);
    this.zNear = zNear;
    this.zFar = zFar;
    this.computeProjectionMatrix();
  }

  get type() {
    return "PerspectiveCamera";
  }

  set cameraAngleDeg(value) {
    this._cameraAngleRadians = this.degToRad(value);
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    this._projectionMatrix = Matrix4.perspective(
      this.fieldOfViewRadians,
      this.aspect,
      this.zNear,
      this.zFar
    );
    this._cameraMatrix = Matrix4.yRotation(this._cameraAngleRadians);
    this._cameraMatrix = Matrix4.translate(
      this._cameraMatrix,
      0,
      0,
      this._radius * 1.5
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
  }
}
