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


    this._localMatrix = Matrix4.zRotation(this._cameraAngleZRadians);
    this._localMatrix = Matrix4.multiply(this._localMatrix.data, Matrix4.yRotation(this._cameraAngleYRadians).data);
    this._localMatrix = Matrix4.multiply(this._localMatrix.data, Matrix4.xRotation(this._cameraAngleXRadians).data);
    
    this._localMatrix = Matrix4.translate(
      this._localMatrix,
      0,
      0,
      this._radius * 1.5
    );

    var cameraPosition = [
      this._localMatrix.data[12],
      this._localMatrix.data[13],
      this._localMatrix.data[14],
    ];

    
    console.log(this._cameraMatrix);

    var up = [0, 1, 0];
    var fPosition = [0, 0, 0];
    this._localMatrix = Matrix4.lookAt(cameraPosition, fPosition, up);
    console.log(this._localMatrix);
    console.log(cameraPosition);
    this._viewProjectionMatrix = Matrix4.inverse(this._localMatrix.data);
    console.log(this._viewProjectionMatrix);
    this._viewProjectionMatrix = Matrix4.multiply(
      this._projectionMatrix.data,
      this._viewProjectionMatrix.data
    );
  }
}
