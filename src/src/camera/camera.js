import { Matrix } from "../math/matrix.js";

class Camera extends Component {
  constructor() {
    super();
    this._projectionMatrix = Matrix.identity();
    this._invWorldMatrix = Matrix.identity();
  }

  computeWorldMatrix() {
    super.computeWorldMatrix();
    this._invWorldMatrix = Matrix.inv(this.worldMatrix);
  }

  get viewProjectionMatrix() {
    this.computeWorldMatrix();
    return this._projectionMatrix.premul(this._invWorldMatrix);
  }

  get projectionMatrix() {
    return this._projectionMatrix;
  }

  computeProjectionMatrix() {
    throw new Error(
      "Camera.computeProjectionMatrix() must be implemented in derived classes."
    );
  }
}
