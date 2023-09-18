const { useSelector, useDispatch } = ReactRedux;
const { useState, useEffect } = React;
import { TodoList } from "../../components/TodoList/TodoList.jsx";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter.jsx";
import { todoService } from "../../services/todo.service.js";
import * as store from "../../../store/store.js";
import { usersService } from "../../services/user.service.js";
export function TodoApp() {
  const dispatch = useDispatch();
  const todoList = useSelector(
    (state) => state.loggedInUser && state.loggedInUser.todoList
  );
  const user = useSelector((state) => state.loggedInUser);
  const filterBy = useSelector((storeState) => storeState.filterBy);
  const [addMode, setAddMode] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    updateTodoList();
  }, [todoList]);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  async function getLoggedInUser() {
    const loggedInUser = await usersService.getLoggedInUser();
    if (loggedInUser) {
      dispatch({ type: store.POST_USER, loggedInUser });
    }
  }

  async function updateTodoList() {
    if (todoList) {
      await usersService.setUserTodoList(user.id, todoList);
    }
  }

  function onTodoEdit(todo) {
    dispatch({ type: store.PUT_TODO, todo });
  }
  function onTodoDelete(todo) {
    dispatch({ type: store.DELETE_TODO, todo });
  }
  function onAddTodo(todo) {
    dispatch({ type: store.POST_TODO, todo });
  }
  function setFilter(ev) {
    dispatch({ type: store.SET_FILTER_BY, val: ev.target.value });
  }
  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    console.log(field, value);

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setNewTodoTitle((prevNewTodoTitle) => ({
      ...prevNewTodoTitle,
      [field]: value,
    }));
    console.log(newTodoTitle);
  }
  function todosToShow() {
    if (filterBy === "all") return todoList;
    return todoList.filter((todo) =>
      filterBy === "completed" ? todo.isDone : !todo.isDone
    );
  }
  return (
    <div>
      {todoList ? (
        <div>
          <TodoFilter setFilter={setFilter} />
          <TodoList
            todoList={todosToShow()}
            onTodoEdit={onTodoEdit}
            onTodoDelete={onTodoDelete}
          />
          {addMode ? (
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                onAddTodo(todoService.createTodo(newTodoTitle.title));
                setAddMode(null);
              }}
            >
              <input type="text" name="title" onInput={handleChange} />
              <button>Submit</button>
            </form>
          ) : (
            <button className="img-button" onClick={() => setAddMode(true)}>
              <img
                src="assets/img/add_FILL0_wght400_GRAD0_opsz24.png"
                alt="add"
              />
            </button>
          )}
        </div>
      ) : (
        <div>not logged in</div>
      )}
    </div>
  );
}
