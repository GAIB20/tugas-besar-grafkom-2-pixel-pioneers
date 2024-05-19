import { setupFullView } from "./BoardFullView";
import { setupPartView } from "./BoardPartView";
import { showTreeComponent } from "../canvas/PartviewCanvas";

export function setupBoard(element) {
    element.innerHTML = `
        <div id="fullview" class="board-section">
        </div>
        <div class="middle-tray">
            <div class="hierarchy" style="overflow: auto;">
                <table style="width: 100%;">
                    <thead>
                        <tr>
                            <th colspan="4">Hierarchy</th>
                        </tr>
                    </thead>
                    <tbody >
                    </tbody>
                </table>
            </div>
            <div class="options">
                <p id="fileNameDisplay">File.txt</p>
                <button class="btn-purple" id="load-model">Choose File</button>
                <input type="file" id="file-input" accept=".json" style="display: none;">
                <button id="save-model" class="btn-purple">Save File</button>
                <button class="btn-purple">Reset</button>
            </div>
        </div>
        <div id="partview" class="board-section">
        </div>
    `;

    const fullviewElement = document.querySelector('#fullview');
    const partviewElement = document.querySelector('#partview');

    if (fullviewElement) {
        setupFullView(fullviewElement);
    }

    if (partviewElement) {
        setupPartView(partviewElement);
    }

    let buttonsHTML
    if (app.model.getTree()) {
        buttonsHTML = createComponentButtons(app.model.getTree());
    }

    const tbody = document.querySelector('tbody');
    Object.values(buttonsHTML).forEach(buttonHTML => {
        tbody.insertAdjacentHTML('beforeend', buttonHTML);
    });

// Menambahkan listener pada tombol komponen tree
document.querySelectorAll("[id^=tree-]").forEach((button) => {
    button.addEventListener("click", function () {
      const compName = this.value;
      const selectedButtons = document.querySelectorAll(".selected");
  
      // Menghapus kelas "selected" dari komponen sebelumnya
      selectedButtons.forEach((selectedButton) => {
        selectedButton.classList.remove("selected");
      });
  
      // Menambahkan kelas "selected" pada komponen yang dipilih
      this.classList.add("selected");
  
      showTreeComponent(compName);
    });
  });}

function createComponentButtons(tree, depth = 0) {
    let buttons = {};

    Object.keys(tree).forEach((compName) => {
        const comp = tree[compName];
        buttons[compName] = `<tr>
                                <td colspan="4">
                                    <div style="margin-left: ${depth * 20}px;">
                                        <input type="submit" id="tree-${compName}" value="${compName}" class="">
                                    </div>
                                </td>
                             </tr>`;
        buttons = {
            ...buttons,
            ...createComponentButtons(comp.children, depth + 1),
        };
    });

    return buttons;
}
