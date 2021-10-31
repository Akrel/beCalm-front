import api from "./api";

class CalendarService {
  addTask(eventCalendarModel) {
    return api
      .put("/calendar/addNewTask", eventCalendarModel)
      .then(response => {
        return response;
      });
  }

  getAllTaskUser(month) {
    return api.get(`/calendar/allInMonth/${month}`).then(response => {
      return response;
    });
  }

  removeTask(taskUuid) {
    return api.delete(`/calendar/removeTask/${taskUuid}`).then(response => {
      return response;
    });
  }

  editTask(evenCalendarModel) {
    return api.put("/calendar/editTask", evenCalendarModel).then(response => {
      return response;
    });
  }
}

export default new CalendarService();
