import { Matrix4 } from "../math/Matrix4.js";
import { OrthographicCamera } from "./OrthographicCamera.js";

export class ObliqueCamera extends OrthographicCamera {
  constructor(gl, left, right, bottom, top, zNear, zFar) {
    super(gl, left, right, bottom, top, zNear, zFar);
    this.theta = 30; 
    this.computeProjectionMatrix();
  }

  get type() {
    return "ObliqueCamera";
  }

  computeProjectionMatrix() {
    super.computeProjectionMatrix();

    const tanTheta = Math.tan(this.theta * Math.PI / 180);
    const shearX = -tanTheta * Math.sign(this.right - this.left);
    const shearY = -tanTheta * Math.sign(this.top - this.bottom);

    this._viewProjectionMatrix = Matrix4.shear(this._viewProjectionMatrix, shearX, shearY);
  }
}
