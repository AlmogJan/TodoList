import { utilService } from "./util.service.js";
export const todoService = {
  getEmptyTodo,
  createTodo,
};

function getEmptyTodo() {
  return {
    id: "",
    createdAt: new Date(),
    title: "",
    isDone: false,
  };
}
function createTodo(title) {
  const todo = {
    id: utilService.makeId(),
    createdAt: new Date(),
    title,
    isDone: false,
  };
  console.log(todo);
  return todo;
}
