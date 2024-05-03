import { Vector3 } from "../math/vector3.js";
import { Matrix } from "../math/matrix.js";

export class Component {
  constructor() {
    this._position = new Vector3();
    this._rotation = new Vector3();
    this._scale = new Vector3(1, 1, 1);
    this._localMatrix = Matrix.identity();
    this._worldMatrix = Matrix.identity();
    this._parent = undefined;
    this._children = [];
    this.visible = true;
  }

  // Getters
  get position() {
    return this._position;
  }
  get rotation() {
    return this._rotation;
  }
  get scale() {
    return this._scale;
  }
  get parent() {
    return this._parent;
  }
  get localMatrix() {
    return this._localMatrix;
  }
  get worldMatrix() {
    return this._worldMatrix;
  }
  get children() {
    return this._children;
  }

  // Setter
  set parent(parent) {
    if (this._parent !== parent) {
      this._parent = parent;
      this.computeWorldMatrix(false, true);
    }
  }

  computeLocalMatrix() {
    this._localMatrix = Matrix.mul(
      Matrix.translation3d(this._position),
      Matrix.rotation3d(this._rotation),
      Matrix.scale3d(this._scale)
    );
  }

  computeWorldMatrix(updateParent = true, updateChildren = true) {
    if (updateParent && this.parent)
      this.parent.computeWorldMatrix(true, false);

    this.computeLocalMatrix();

    if (this.parent) {
      this._worldMatrix = Matrix.mul(
        this.parent.worldMatrix,
        this._localMatrix
      );
    } else {
      this._worldMatrix = this._localMatrix.clone();
    }

    if (updateChildren) {
      this._children.forEach((child) => {
        child.computeWorldMatrix(false, true);
      });
    }
  }

  add(node) {
    if (node.parent !== this) {
      node.removeFromParent();
      node.parent = this;
    }
    this._children.push(node);
    return this;
  }

  remove(node) {
    const index = this._children.indexOf(node);
    if (index !== -1) {
      this._children.splice(index, 1);
      node.parent = undefined;
    }
  }

  removeFromParent() {
    if (this.parent) {
      this.parent.remove(this);
    }
    return this;
  }
}
