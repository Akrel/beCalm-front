export default class EventCalendarModel {
  constructor(title, description, startDate, endDate, allDay, color) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.color = color;
    this.allDay = allDay;
  }
}
