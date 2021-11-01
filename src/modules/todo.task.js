import Vue from "vue";

export default {
  state: {
    userData: [],
    temp: "",
    data: [],
    todos: [
      {
        completed: false,
        id: 201,
        title: "Standup meeting with the team @5pm",
        description: null,
        inDate: "Jul 10",
        priority: "Low",
        tags: [{ name: "Personal", color: "rgb(102, 204, 255)" }],
        priorityColor: "#5e72e4"
      },
      {
        completed: false,
        id: 202,
        title: "Order pizza for Granny tonight",
        description: "Thin crust medium size roasted chicken",
        inDate: "Jul 10",
        priority: "High",
        tags: [
          { name: "Home", color: "rgb(255, 203, 0)" },
          {
            name: "Personal",
            color: "rgb(102, 204, 255)"
          }
        ],
        priorityColor: "#f5365c"
      },
      {
        completed: false,
        id: 203,
        title: "Design, Develop and Deploy Apps to Netlify for Clients",
        description: null,
        inDate: "Jul 10",
        priority: "Medium",
        tags: [{ name: "Home", color: "rgb(255, 203, 0)" }],
        priorityColor: "#ffbb33"
      }
    ],
    allTags: [
      {
        name: "Home",
        color: "rgb(255, 203, 0)"
      },
      {
        name: "Personal",
        color: "rgb(102, 204, 255)"
      },
      {
        name: "Work",
        color: "rgb(162, 93, 220)"
      }
    ],
    defaultTagColor: "rgb(128, 128, 128)",
    colorPalete: [
      "#00C821",
      "#9CD326",
      "#CAB641",
      "#FFCB00",
      "#784BD1",
      "#A25DDC",
      "#0086C0",
      "#579BFC",
      "#66CCFF",
      "#BB3354",
      "#E2445C",
      "#FF158A",
      "#FF5AC4",
      "#FF642E",
      "#FDAB3D",
      "#7F5347",
      "#C4C4C4",
      "#808080",
      "#333333"
    ]
  },

  getters: {
    filterTags: state => {
      return id =>
        state.allTags.filter(tag => {
          if (tag) return tag.name.toLowerCase().includes(id.toLowerCase());
        });
    },

    colorPalete: state => state.colorPalete,
    getTodos: state => state.todos,
    getUserData: state => state.userData
    // getAllTags: state => state.allTags,
  },

  actions: {
    async saveUserData({ commit }, payload) {
      commit("SAVE_USER_DATA", payload);
    },
    async createNewTodo({ commit }, payload) {
      commit("CREATE_NEW_TODO", payload);
    },
    async addNewTag({ commit }, payload) {
      commit("ADD_NEW_TAG", payload);
    },
    async markAsComplete({ commit }, payload) {
      commit("MARK_AS_COMPLETE", payload);
    },
    async updateTodo({ commit }, payload) {
      commit("UPDATE_TODO", payload);
    },
    async deleteTodo({ commit }, payload) {
      commit("", payload);
    },
    async changeTagColor({ commit }, tag) {
      commit("CHANGE_TAG_COLOR", tag);
    },
    async updateTodoTags({ commit }, payload) {
      commit("UPDATE_TOD_TAGS", payload);
    }
  },

  mutations: {
    // Set Initial Data
    SAVE_USER_DATA(state, payload) {
      state.userData = payload;
    },
    ADD_NEW_TAG(state, tagName) {
      state.allTags.push({ name: tagName, color: state.defaultTagColor });
    },
    CREATE_NEW_TODO(state, payload) {
      state.todos.unshift(payload);
    },
    MARK_AS_COMPLETE(state, key) {
      if (state.todos[key].completed) {
        state.todos[key].completed = false;
      } else {
        state.todos[key].completed = true;
      }
    },
    /*  delete_todo(state, key = payload) {
          state.todos.splice(key, 1);
        },*/
    UPDATE_TOD_TAGS(state, payload) {
      state.todos.filter(e => {
        if (e.id == payload.id) {
          e.tags = payload.tags;
        }
      });
    },
    UPDATE_TODO(state, payload) {
      state.todos.forEach(element => {
        if (element.id == payload.id) {
          console.log("UPDATE ", element);
        }
      });
    },

    CHANGE_TAG_COLOR: (state, payload) =>
      (state.allTags[payload.key].color = payload.color),
    // Archive Task Board
    ARCHIVE_TASKBOARD(state, payload) {
      console.log("state ", state);
      console.log("payload ", payload);

      /*  const board = state.boards.find(b => b.id == payload.boardId)
              const boardIdx = state.boards.findIndex(b => b.id == payload.boardId)*/
      Vue.swal({
        title: "Are you sure?",
        text: "It will permanently deleted !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(function() {
        Vue.swal(
          "Deleted!",
          // state.boards.splice(boardIdx, 1),
          "Your file has been deleted.",
          "success"
        );
      });
    }
  }
};