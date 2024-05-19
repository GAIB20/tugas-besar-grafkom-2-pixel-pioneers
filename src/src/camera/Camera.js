import { Matrix } from "../math/Matrix.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Component } from "../primitives/Component.js";
import { Transform } from "../primitives/Transform.js";

export class Camera extends Component {
  constructor(radius) {
    super();
    this._projectionMatrix = Matrix4.identity();
    this._viewProjectionMatrix = Matrix4.identity();
    this.transform = new Transform();
  }

  setCameraAngleDeg(type, value) {
    this.transform.setAngleDeg(type, value);
    this.computeProjectionMatrix();
  }

  setCameraTranslate(type, value) {
    this.transform.setTranslate(type, value);
    this.computeProjectionMatrix();
  }

  get viewProjectionMatrix() {
    return this._viewProjectionMatrix;
  }

  get projectionMatrix() {
    return this._projectionMatrix.data;
  }

  degToRad(d) {
    return (d * Math.PI) / 180;
  }

  computeProjectionMatrix() {
    throw new Error(
      "Camera.computeProjectionMatrix() must be implemented in derived classes."
    );
  }
}
