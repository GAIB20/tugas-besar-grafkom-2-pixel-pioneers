import { Matrix4 } from "../math/Matrix4.js";
import { Camera } from "./Camera.js";

export class OrthographicCamera extends Camera {
  constructor(gl, left, right, bottom, top, zNear, zFar) {
    super();
    this.gl = gl;
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.top = top;
    this.near = zNear;
    this.far = zFar;
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    this.transform.translateZ = 10;
    this.computeProjectionMatrix();
  }

  get type() {
    return "OrthographicCamera";
  }
  

  computeProjectionMatrix() {
    const d = [
      (this.right - this.left) / (2 * this.transform.translateZ / 300),
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
    this._projectionMatrix = Matrix4.ortographic(
        ...border, this.near, this.far,
    );
    this._viewProjectionMatrix = Matrix4.inverse(this.transform.getLocalMatrix().data);
    this._viewProjectionMatrix = Matrix4.multiply(
      this._projectionMatrix.data,
      this._viewProjectionMatrix.data
    );
  }
}
