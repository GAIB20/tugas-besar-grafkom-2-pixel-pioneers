import { Matrix4 } from "../math/Matrix4.js";
import { Camera } from "./Camera.js";

export class ObliqueCamera extends Camera {
  constructor(left, right, top, bottom, near, far, angle = 45) {
    super();
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;
    this.angle = angle;
    this.computeProjectionMatrix();
  }

  get type() {
    return "ObliqueCamera";
  }

  computeProjectionMatrix() {
    this.projectionMatrix = Matrix4.oblique(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.near,
      this.far,
      this.angle,
      0.5,
      1.0
    );
  }
}
