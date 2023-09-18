import { utilService } from "./util.service.js";
export const todoService = {
  createTodo,
};

function createTodo(title) {
  const todo = {
    id: utilService.makeId(),
    createdAt: new Date(),
    title,
    isDone: false,
  };
  return todo;
}
