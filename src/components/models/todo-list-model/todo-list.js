export default class TodoList {
  elements;
  description;
  checked;

  constructor(elements, checked, description) {
    this.elements = elements;
    this.description = description;
    this.checked = checked;
  }
}
