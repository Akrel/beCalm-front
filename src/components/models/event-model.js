export default class EventCalendar {
  constructor(title, description, startDate, endDate, allDay,color ,todoList = []) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.allDay = allDay;
    this.todoList = todoList;
    this.color = color;
  }
}
