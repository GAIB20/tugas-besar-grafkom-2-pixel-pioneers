import { setupCanvas } from "../canvas/canvas"

export function setupFullView(element: HTMLDivElement) {
    element.innerHTML = `
        <canvas></canvas>
        <div class= "properties">
            <h1>Fullview Properties</h1>
        </div>
    `
    setupCanvas(document.querySelector<HTMLDivElement>('#fullview-canvas')!)
}