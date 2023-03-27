import TodotaskService from "../services/todotask.service";
import TodoElement from "../models/todo-element";

export default {
  namespaced: true,
  state: {
    todos: []
  },

  actions: {
    addTodo({ commit }, text) {
      let todoElement = new TodoElement(text, false, "");
      return TodotaskService.addTodoTask(todoElement).then(task => {
        commit("addTodo", task.data);
      });
    },

    removeTodo({ commit }, todo) {
      return TodotaskService.removeTodoTask(todo.uid).then(
        () => {
          commit("removeTodo", todo);
        },
        error => {
          commit("taskFailure");
          return Promise.reject(error);
        }
      );
    },
    toggleTodo({ commit }, todo) {
      return TodotaskService.toogleTaskTodo(todo).then(task => {
        commit("editTodo", { task, done: !todo.done });
      });
    },
    editTodo({ commit }, { todo, value }) {
      todo.text = value;
      TodotaskService.editTodo(todo).then(task => {
        commit("editTodo", { task, text: value });
      });
    },
    getAll({ commit }) {
      TodotaskService.getAllTodoTask().then(task => {
        commit("getAll", task.data);
      });
    }
  },

  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, todo) {
      let index = state.todos.findIndex(element => element.uid === todo.uid);
      state.todos.splice(index, 1);
    },
    taskFailure(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },
    editTodo(state, { todo, text = todo.text, done = todo.done }) {
      todo.text = text;
      todo.done = done;
    },

    getAll(state, listTask) {
      state.todos = listTask;
      console.log("dsa");
    }
  }
};

