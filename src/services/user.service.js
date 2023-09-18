import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const usersService = {
  createUser,
  login,
  signup,
  getLoggedInUser,
  setUserTodoList,
  createEmptyUser,
  save,
};
const STORAGE_KEY_LOGGEDIN = "user";
const USERS_KEY = "UsersDB";

function createUser(
  username,
  password,
  fullName,
  todoList = [],
  activities = [],
  balance = 0
) {
  return {
    id: utilService.makeId(),
    username,
    password,
    fullName,
    todoList,
    activities,
    balance,
  };
}

function createEmptyUser() {
  return {
    username: "",
    password: "",
    fullName: "",
    todoList: [],
    activities: [],
    balance: 0,
  };
}

function login(username, password) {
  return storageService.query(USERS_KEY).then((users) => {
    const user = users.find(
      (user) => username === user.username && password === user.password
    );
    _setLoggedInUser(user);
    return user;
  });
}

function signup(user) {
  return storageService.post(
    USERS_KEY,
    createUser(user.username, user.password, user.fullName)
  );
}

async function getLoggedInUser() {
  const { id } = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
  return (await storageService.query(USERS_KEY)).find((user) => user.id === id);
}

function save(user) {
  if (user.id) {
    return storageService.put(TODOS_KEY, todo).then((savedTodo) => {
      // userService.addActivity("Updated", savedTodo._id);
      return savedTodo;
    });
  } else {
    return storageService.post(USERS_KEY, user).then((user) => {
      _setLoggedInUser(user);
      return user;
    });
  }
}

function _setLoggedInUser(user) {
  const userToSave = {
    id: user.id,
    fullName: user.fullName,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
  return userToSave;
}

function setUserTodoList(userId, todoList) {
  return storageService.query(USERS_KEY).then((users) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.todoList = todoList;
      storageService.put(USERS_KEY, user).then((res) => {
        return res;
      });
    }
  });
}
