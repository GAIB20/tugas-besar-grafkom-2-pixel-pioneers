import { setupCanvas } from "../canvas/canvas"

export function setupPartView(element: HTMLDivElement) {
    element.innerHTML = `
        <canvas id="partview-canvas"></canvas>
        <div class= "properties">
            <div class="properties-content"> 
                <h2>Partview Properties</h2>
                <h4>Camera</h4>
                <div class="transformation-container">
                    <div class="slider-container-2">
                        <p>Angle</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container-2">
                        <p>Radius</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Translation</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Scale</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    `
    setupCanvas(document.querySelector<HTMLDivElement>('#partview-canvas')!)
}