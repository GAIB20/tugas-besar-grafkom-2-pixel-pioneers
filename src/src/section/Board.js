import { selectComponent } from "../canvas/Canvas";
import { setupProperties } from "./Properties";

export function setupBoard(element) {
    element.innerHTML = `
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
            </div>
        </div>
        <div id="fullview" class="board-canvas">
          <canvas id="fullview-canvas"></canvas>
          <canvas id="canvas-2"></canvas>
        </div>
        <div id="partview" class="board-section">
        </div>
    `;

    const partviewElement = document.querySelector('#partview');

    if (partviewElement) {
        setupProperties(partviewElement);
    }

    setupSceneGraph();
}

export const setupSceneGraph = () => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if(!app.model) {
    return;
  }

  let buttonsHTML;
  if (app.model.getTree()) {
    buttonsHTML = createComponentButtons(app.model.getTree());
  }

  Object.values(buttonsHTML).forEach((buttonHTML) => {
    tbody.insertAdjacentHTML("beforeend", buttonHTML);
  });

  const componentController = document.getElementById("component-controller");
  const materialController = document.getElementById("material-controller");

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

      if (compName.startsWith("P")) {
        componentController.style.display = "none";
        materialController.style.display = "flex";
      } else if (compName.startsWith("R")) {
        componentController.style.display = "flex";
        materialController.style.display = "none";
      } else {
        componentController.style.display = "flex";
        materialController.style.display = "flex";
      }

      selectComponent(compName);
    });
  });
};

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
