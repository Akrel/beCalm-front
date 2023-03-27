export default class TodoElement {
  text;
  done;
  uid;

  constructor(text, done,uid) {
    this.text = text;
    this.done = done;
    this.uid = uid;
  }
}
