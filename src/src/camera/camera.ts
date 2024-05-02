import { Component } from "../primitives/component";
import { Matrix } from "../primitives/matrix";

export class Camera extends Component {
    protected _projectionMatrix: Matrix = Matrix.identity();
    private _invWorldMatrix: Matrix = Matrix.identity();

    computeWorldMatrix(): void {
        super.computeWorldMatrix();
        this._invWorldMatrix = Matrix.inv(this.worldMatrix);
    }

    get viewProjectionMatrix(): Matrix {
        this.computeWorldMatrix();
        return this._projectionMatrix.premul(this._invWorldMatrix);
    }
   
    get projectionMatrix(): Matrix {
        return this._projectionMatrix;
    }

    computeProjectionMatrix(): void {
        throw new Error("Camera.computeProjectionMatrix() must be implemented in derived classes.");
    }
}