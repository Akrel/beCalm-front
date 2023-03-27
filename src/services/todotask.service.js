import api from "./api";

class TodotaskService {
    addTodoTask(todoTask) {
        return api.put(`/todoTask/addNew`, todoTask).then(response => {
            return response;
        });
    }

    getAllTodoTask() {
        return api.get("/todoTask/getAll").then(response => {
            return response;
        });
    }

    removeTodoTask(todoTaskUuid){
        return api.delete(`/todoTask/remove/${todoTaskUuid}`).then(response => {
            return response;
        });
    }

    toogleTaskTodo(todoTaskUuid){
        return api.put(`/todoTask/toogleTask/${todoTaskUuid}`).then(response => {
            return response;
        });
    }

    editTodo(todoTask){
        return api.put("/todoTask/editTodo",todoTask).then(response => {
            return response;
        });
    }
}
export default new TodotaskService();