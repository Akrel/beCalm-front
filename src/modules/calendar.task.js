import CalendarService from "../services/calendar.service";

export default {
  namespaced: true,

  state: {
    listEvent: []
  },

  getters: {
    getTask(state) {
      return state.listEvent;
    }
  },

  actions: {
    addNewEvent({commit}, element) {
      return CalendarService.addTask(element).then(
          task => {
            commit("addedTask", task);
            return Promise.resolve(task);
          },
          error => {
            commit("taskFailure");
            return Promise.reject(error);
          }
      );
    },

    getAllTaskInMonth({commit}, dateMonth) {
      return CalendarService.getAllTaskUser(dateMonth).then(task => {
        commit("getAllTask", task.data);
      });
    },

    removeTask({commit},taskUuid) {
      return CalendarService.removeTask(taskUuid).then(
          task => {
            commit("removed", task);
            return Promise.resolve(task);
          },
          error => {
            return Promise.reject(error);
          }
      );
    }
  },

  mutations: {
    addedTask(event) {
      this.state.listEvent.push(event);
    },
    removed(event) {
      this.state.listEvent.filter(item => item !== event)
    },
    getAllTask(state, listOfTask) {
      if (state.listEvent !== undefined) this.state.listEvent = [];
      state.listEvent = listOfTask;
    }
  }
};