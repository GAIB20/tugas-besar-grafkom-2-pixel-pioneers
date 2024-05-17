import { Matrix4 } from "../math/Matrix4.js";
import { Camera } from "./Camera.js";

export class PerspectiveCamera extends Camera {
  constructor(gl, fieldOfViewDeg, cameraAngleDeg, radius, zNear, zFar) {
    super(radius);
    this._cameraAngleXRadians = this.degToRad(cameraAngleDeg);
    this._cameraAngleYRadians = this.degToRad(cameraAngleDeg);
    this._cameraAngleZRadians = this.degToRad(cameraAngleDeg);
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
    if (type == 'X') {
      this._cameraAngleXRadians = this.degToRad(value);
    } else if (type == 'Y') {
      this._cameraAngleYRadians = this.degToRad(value);
    } else if (type == 'Z') {
      this._cameraAngleZRadians = this.degToRad(value);
  }

    console.log("ANGLE", this._cameraAngleXRadians, this._cameraAngleYRadians, this._cameraAngleZRadians);
    
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    this._projectionMatrix = Matrix4.perspective(
      this.fieldOfViewRadians,
      this.aspect,
      this.zNear,
      this.zFar
    );


    this._cameraMatrix = Matrix4.zRotation(this._cameraAngleZRadians);
    this._cameraMatrix = Matrix4.multiply(this._cameraMatrix.data, Matrix4.yRotation(this._cameraAngleYRadians).data);
    this._cameraMatrix = Matrix4.multiply(this._cameraMatrix.data, Matrix4.xRotation(this._cameraAngleXRadians).data);
    
    this._cameraMatrix = Matrix4.translate(
      this._cameraMatrix,
      0,
      0,
      this._radius * 1.5
    );

    var cameraPosition = [
      this._localMatrix.data[12],
      this._localMatrix.data[13],
      this._localMatrix.data[14],
    ];


    var up = [0, 1, 0];
    var fPosition = [0, 0, 0];
    this._localMatrix = Matrix4.lookAt(cameraPosition, fPosition, up);
    this._viewProjectionMatrix = Matrix4.inverse(this._localMatrix.data);
    this._viewProjectionMatrix = Matrix4.multiply(
      this._projectionMatrix.data,
      this._viewProjectionMatrix.data
    );
  }
}
