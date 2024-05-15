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
    this.zNear = zNear;
    this.zFar = zFar;
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    this.computeProjectionMatrix();
  }

  get type() {
    return "OrthographicCamera";
  }

  computeProjectionMatrix() {
    this._viewProjectionMatrix = Matrix4.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
  }
}
