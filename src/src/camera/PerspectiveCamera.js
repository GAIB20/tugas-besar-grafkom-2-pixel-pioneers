import { Matrix4 } from "../math/matrix4.js";
import { Camera } from "./camera.js";

export class PerspectiveCamera extends Camera {
  constructor(gl, fieldOfViewDeg, cameraAngleDeg, radius, zNear, zFar) {
      super(cameraAngleDeg, radius);
      this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      this.fieldOfViewRadians = this.degToRad(fieldOfViewDeg);
      this.zNear = zNear;
      this.zFar = zFar;
      this.computeProjectionMatrix();
  }

  get type() {
      return "PerspectiveCamera";
  }

  computeProjectionMatrix() {
    this._projectionMatrix = Matrix4.perspective(this.fieldOfViewRadians, this.aspect, this.zNear, this.zFar);
  }
}
