import { Component } from "../primitives/Component.js";

export class OrbitControl {
  constructor(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
    this.radius = camera._radius;
    this.center = new Component();
    this.isPanning = false;
    this.isMoving = false;
    this.init();
  }

  init() {
    this.center.name = "Camera";
    this.center.add(this.camera);
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvas.addEventListener("wheel", this.onMouseWheel.bind(this));
  }

  onMouseDown(event) {
    this.isPanning = event.shiftKey;
    this.isMoving = !this.isPanning;
  }

  onMouseUp() {
    this.isMoving = false;
    this.isPanning = false;
  }

  onMouseMove(event) {
    const dx = event.movementX,
      dy = event.movementY;
    if (this.isMoving) {
      this.center._rotation.x =
        this.center._rotation.x - ((dy * (Math.PI / 180)) % Math.PI) * 2;
      this.center._rotation.y =
        this.center._rotation.y - ((dx * (Math.PI / 180)) % Math.PI) * 2;
    } else if (this.isPanning) {
      this.center._position.x -= dx;
      this.center._position.y += dy;
    }
  }

  onMouseWheel(event) {
    this.camera.radiusDeg = this.camera._radius + event.deltaY;
  }

  update() {
    this.center.computeWorldMatrix();
    this.camera.computeProjectionMatrix();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.canvas.removeEventListener("wheel", this.onMouseWheel);
  }
}
