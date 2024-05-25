import { ObliqueCamera } from "../camera/ObliqueCamera";
import { OrthographicCamera } from "./OrthographicCamera";

export class OrbitControl {
  constructor(webgl, canvas, camera, scene, sliderX, sliderY, angleX, angleY, obliqueSlider, obliqueValue, radiusSlider, radiusValue, resetViewButton) {
    this.webgl = webgl;
    this.isDragging = false;
    this.previousMousePosition = {
        x: 0,
        y: 0
    };
    this.canvas = canvas;
    this.camera = camera;
    this.scene = scene;
    this.sliderX = sliderX;
    this.sliderY = sliderY;
    this.angleX = angleX;
    this.angleY = angleY;
    this.obliqueSlider = obliqueSlider;
    this.obliqueValue = obliqueValue;
    this.radiusSlider = radiusSlider;
    this.radiusValue = radiusValue;
    this.resetViewButton = resetViewButton;
    this.setup();
  }

  changeCamera(camera) {
    this.camera = camera;
  }

  setup() {
    this.canvas.addEventListener("mousedown", (event) => {
        this.isDragging = true;
        this.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    this.canvas.addEventListener("mouseup", () => {
        this.isDragging = false;
    });

    this.canvas.addEventListener("mousemove", (event) => {
        if (this.isDragging) {
            var deltaX = event.clientX - this.previousMousePosition.x;
            var deltaY = event.clientY - this.previousMousePosition.y;
            this.previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            
            var newAngleX = parseFloat(this.camera.transform.angleX / Math.PI * 180) - deltaY;
            var newAngleY = parseFloat(this.camera.transform.angleY / Math.PI * 180) - deltaX;


            newAngleX = newAngleX > 180 ? newAngleX - 360 : newAngleX;
            newAngleY = newAngleY > 180 ? newAngleY - 360 : newAngleY;
            newAngleX = newAngleX < -180 ? newAngleX + 360 : newAngleX;
            newAngleY = newAngleY < -180 ? newAngleY + 360 : newAngleY;

            this.angleX.textContent = parseInt(newAngleX);
            this.angleY.textContent = parseInt(newAngleY);
            this.sliderX.value = parseInt(newAngleX);
            this.sliderY.value = parseInt(newAngleY);

            this.camera.setCameraAngleDeg("X", newAngleX);
            this.camera.setCameraAngleDeg("Y", newAngleY);
            
            this.webgl.render(this.scene, this.camera);
        }
    });

    this.sliderX.addEventListener("input", (event) => {
        this.camera.setCameraAngleDeg("X", event.target.value);
        this.angleX.textContent = event.target.value;
        this.webgl.render(this.scene, this.camera);
    });
    
    this.sliderY.addEventListener("input", (event) => {
        this.camera.setCameraAngleDeg("Y", event.target.value);
        this.angleY.textContent = event.target.value;
        this.webgl.render(this.scene, this.camera);
    });
    
    this.radiusSlider.addEventListener("input", (event) => {
        this.camera.setCameraTranslate("Z", event.target.value);
        this.radiusValue.textContent = event.target.value;
        this.webgl.render(this.scene, this.camera);
    });
    
    this.obliqueSlider.addEventListener("input", (event) => {
        this.camera.setObliqueAngleDeg(event.target.value);
        this.obliqueValue.textContent = event.target.value;
        this.webgl.render(this.scene, this.camera);
    });

    this.resetViewButton.addEventListener("click", (event) =>  {
        this.camera.setCameraAngleDeg("X", 0);
        this.angleX.textContent = 0;
        this.sliderX.value = 0;
    
        this.camera.setCameraAngleDeg("Y", 0);
        this.angleY.textContent = 0;
        this.sliderY.value = 0;

        if (this.camera instanceof OrthographicCamera) {
            this.camera.setCameraTranslate("Z", 10);
            this.radiusValue.textContent = 10;
            this.radiusSlider.value = 10;
        } else {
            this.camera.setCameraTranslate("Z", 300);
            this.radiusValue.textContent = 300;
            this.radiusSlider.value = 300;
        }
    
        if (this.camera instanceof ObliqueCamera) {
          this.camera.setObliqueAngleDeg(30);
          this.obliqueValue.textContent = 30;
          this.obliqueSlider.value = 30;
        }
        
        this.webgl.render(this.scene, this.camera);
    });
  }
}
