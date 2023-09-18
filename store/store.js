const { createStore, compose } = Redux;
import { usersService } from "../src/services/user.service.js";

export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";

export const POST_TODO = "POST_TODO";
export const PUT_TODO = "PUT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_TODOS = "SET_TODOS";

const initialState = {
  filterBy: "all",
  loggedInUser: usersService.createEmptyUser(),
};
function appReducer(state = initialState, action) {
  let todo = null;
  let todoList = null;
  let todoIndex = null;
  let loggedInUser = null;
  switch (action.type) {
    // User
    case POST_USER:
    case PUT_USER:
      loggedInUser = { ...action.loggedInUser };
      return { ...state, loggedInUser };

    // Todos
    case SET_TODOS:
      todoList = { ...action.todoList };
      loggedInUser = { ...state.loggedInUser, todoList };
      return { ...state, loggedInUser };
    case POST_TODO:
      todo = { ...action.todo };
      todoList = [todo, ...state.loggedInUser.todoList];
      loggedInUser = { ...state.loggedInUser, todoList };
      return { ...state, loggedInUser };
    case PUT_TODO:
      todo = { ...action.todo };
      todoList = [...state.loggedInUser.todoList];

      todoIndex = todoList.findIndex((item) => item.id === todo.id);
      todoList[todoIndex] = todo;
      loggedInUser = { ...state.loggedInUser, todoList };

      return { ...state, loggedInUser };
    case DELETE_TODO:
      todo = { ...action.todo };
      todoList = [...state.loggedInUser.todoList];
      todoIndex = todoList.findIndex((item) => item.id === todo.id);
      todoList.splice(todoIndex, 1);
      loggedInUser = { ...state.loggedInUser, todoList };
      console.log(todoIndex);
      return { ...state, loggedInUser };
    case SET_FILTER_BY:
      return { ...state, filterBy: action.val };
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, composeEnhancers());

window.gStore = store;
