export default class EventCalendarModel {
  constructor(taskUuid, name, description, start, end, allDay, color) {
    this.name = name;
    this.description = description;
    this.start = start;
    this.end = end;
    this.allDay = allDay;
    this.color = color;
    this.taskUuid = taskUuid;
  }

  $title(value) {
    this.name = value;
    return this;
  }

  $description(value) {
    this.description = value;
    return this;
  }

  $startDate(value) {
    this.start = value;
    return this;
  }

  $endDate(value) {
    this.end = value;
    return this;
  }

  $color(value) {
    this.color = value;
    return this;
  }

  $taskUuid(value) {
    this.taskUuid = value;
    return this;
  }

  $allDay(allDay) {
    this.allDay = allDay;
    return this;
  }

  build() {
    if (!this.allDay && this.end === undefined) throw new Error("");

    return new EventCalendarModel(
      this.taskUuid,
      this.name,
      this.description,
      this.start,
      this.end,
      this.allDay,
      this.color
    );
  }
}
