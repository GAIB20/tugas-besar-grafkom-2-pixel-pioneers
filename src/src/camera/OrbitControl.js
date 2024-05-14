import { Component } from "../primitives/component.js";

export class OrbitControl {
    constructor(camera, canvas, target = null) {
        this.camera = camera;
        this.canvas = canvas;
        this.target = target;
        this.radius = 700;
        this.center = new Component();
        this.allowPan = true;
        this.allowZoom = true;
        this.allowRotate = true;
        this.isPanning = false;
        this.isMoving = false;
        this.init();
    }

    init() {
        this.center.name = "Camera";
        this.center.add(this.camera);
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.onMouseWheel.bind(this));
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
        const dx = event.movementX, dy = event.movementY;
        if (this.isMoving && this.allowRotate) {
            this.center.rotation.x = this.center.rotation.x - dy * (Math.PI / 180) % Math.PI *2;
            this.center.rotation.y = this.center.rotation.y - dx * (Math.PI / 180) %Math.PI *2;
        } else if (this.isPanning && this.allowPan) {
            this.center.position.x -= dx;
            this.center.position.y += dy;
        }
    }

    onMouseWheel(event) {
        if (!this.allowZoom) return;
        this.camera.zoom += event.deltaY;
    }

    update() {
        if (this.target)
            this.center.position.copy(this.target.position);
        this.center.computeLocalMatrix();
    }

    destroy() {
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
        this.canvas.removeEventListener('wheel', this.onMouseWheel);
    }
}
