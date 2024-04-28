export function setupBoard(element: HTMLDivElement) {
    element.innerHTML = `
        <div class="header-title">
            <p class="pp-title">Pixel Pioneers</p>
        </div>
        <div class="header-filesystem">
            <p>File.txt</p>
            <button class="btn-purple">Choose File</button>
        </div>
    `
}