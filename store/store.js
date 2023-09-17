const { createStore, compose } = Redux;

export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";

export const POST_TODO = "POST_TODO";
export const PUT_TODO = "PUT_TODO";
export const DELETE_TODO = "DELETE_TODO";

const initialState = {
  id: "1234",
  fullname: "Pitzy pitz",
  username: "Pitzy123",
  password: "123Pitzy",
  balance: 6,
  todoList: [
    {
      id: "todo1234",
      createdAt: new Date(),
      title: "do your homework",
      isDone: false,
    },
    {
      id: "todo12345",
      createdAt: new Date(),
      title: "do your laundry",
      isDone: false,
    },
  ],
  activities: [
    {
      action: "edit",
      todoId: "todo12345",
      at: new Date(),
    },
  ],
};

function appReducer(state = initialState, action) {
  let todo = null;
  let todoList = null;
  let todoIndex = null;
  switch (action.type) {
    // User
    case POST_USER:
    case PUT_USER:
      return { ...action.user };

    // Todos
    case POST_TODO:
      todo = { ...action.todo };
      todoList = [todo, ...state.todoList];
      return { ...state, todoList };
    case PUT_TODO:
      console.log("asdf");
      todo = { ...action.todo };
      todoList = [...state.todoList];

      todoIndex = todoList.findIndex((item) => item.id === todo.id);
      todoList[todoIndex] = todo;

      return { ...state, todoList };
    case DELETE_TODO:
      todo = { ...action.todo };
      todoList = [...state.todoList];
      todoIndex = todoList.findIndex((item) => item.id === todo.id);
      todoList.splice(todoIndex, 1);
      return { ...state, todoList };
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, composeEnhancers());

window.gStore = store;
