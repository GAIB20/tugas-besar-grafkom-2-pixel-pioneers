import { setupCanvas } from "../canvas/canvas"

export function setupPartView(element: HTMLDivElement) {
    element.innerHTML = `
        <canvas></canvas>
        <div class= "properties">
            <h1>Partview Properties</h1>
        </div>
    `
    setupCanvas(document.querySelector<HTMLDivElement>('#fullview-canvas')!)
}