import { Matrix4 } from "../math/Matrix4.js";
import { Camera } from "./Camera.js";

export class PerspectiveCamera extends Camera {
  constructor(gl, fieldOfViewDeg, cameraAngleDeg, radius, zNear, zFar) {
    super(radius);
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    this.fieldOfViewRadians = this.degToRad(fieldOfViewDeg);
    this.zNear = zNear;
    this.zFar = zFar;
    this.computeProjectionMatrix();
  }

  get type() {
    return "PerspectiveCamera";
  }

  setCameraAngleDeg(type, value) {
    this.transform.setAngleDeg(type, value);
    this.computeProjectionMatrix();
  }

  setCameraTranslate(type, value) {
    this.transform.setTranslate(type, value);
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    this._projectionMatrix = Matrix4.perspective(
      this.fieldOfViewRadians,
      this.aspect,
      this.zNear,
      this.zFar
    );

    this._viewProjectionMatrix = Matrix4.inverse(this.transform.getLocalMatrix().data);
    this._viewProjectionMatrix = Matrix4.multiply(
      this._projectionMatrix.data,
      this._viewProjectionMatrix.data
    );
  }
}
