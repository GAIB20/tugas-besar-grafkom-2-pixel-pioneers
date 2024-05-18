import { Matrix4 } from "../math/Matrix4.js";

export class Transform {
  constructor() {
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 300;
  }

  degToRad(d) {
    return (d * Math.PI) / 180;
  }

  setAngleDeg(type, value) {
    if (type == "X") {
      this.angleX = this.degToRad(value);
    } else if (type == "Y") {
      this.angleY = this.degToRad(value);
    } else if (type == "Z") {
      this.angleZ = this.degToRad(value);
    }
  }

  setTranslate(type, value) {
    if (type == "X") {
      this.translateX = 1.5 * value;
    } else if (type == "Y") {
      this.translateY = 1.5 * value;
    } else if (type == "Z") {
      this.translateZ = 1.5 * value;
    }
  }

  getLocalMatrix() {
    var localMatrix = Matrix4.identity();

    localMatrix = Matrix4.multiply(
      Matrix4.xRotation(this.angleX).data,
      localMatrix.data
    );
    localMatrix = Matrix4.multiply(
      Matrix4.yRotation(this.angleY).data,
      localMatrix.data
    );
    localMatrix = Matrix4.multiply(
      Matrix4.zRotation(this.angleZ).data,
      localMatrix.data
    );

    localMatrix = Matrix4.translate(
        localMatrix,
        this.translateX,
        this.translateY,
        this.translateZ
    );

    return localMatrix
  }
}

