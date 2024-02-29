import Column from "./column.js";

export default class kanban {
  constructor(root) {
    this.root = root;

    kanban.columns().forEach((column) => {
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1,
        title: "To-Do",
      },
      {
        id: 2,
        title: "On Progress",
      },
      {
        id: 3,
        title: "Done",
      },
    ];
  }
}
