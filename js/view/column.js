import kanbanAPI from "../api/kanbanAPI.js";
import Item from "../view/item.js";
import dropzone from "./dropzone.js";

export default class column {
  constructor(id, title) {
    const topDropZone = dropzone.createDropZone();

    this.elements = {};
    this.elements.root = column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      ".kanban__column-title"
    );
    this.elements.items = this.elements.root.querySelector(
      ".kanban__column-items"
    );
    this.elements.addItem =
      this.elements.root.querySelector(".kanban__add-item");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;
    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener("click", () => {
      const newItem = kanbanAPI.insertItem(id, "");

      this.renderItem(newItem);
    });
    kanbanAPI.getItem(id).forEach(item => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
    <div class="kanban__column">
    <div class="kanban__column-title"></div>
    <div class="kanban__column-items"></div>
    <button class="kanban__add-item" type="button">Add +</button>
  </div>`).children[0];
  }

  renderItem(data){
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}
