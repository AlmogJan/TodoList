const { useSelector, useDispatch } = ReactRedux;
const { useState } = React;
import { TodoList } from "../../components/TodoList/TodoList.jsx";
import { PUT_TODO, DELETE_TODO } from "../../../store/store.js";

export function TodoApp() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const [addMode, setAddMode] = useState(null);
  const [newTodo, setNewTodo] = useState();

  function onTodoEdit(todo) {
    dispatch({ type: PUT_TODO, todo });
  }
  function onTodoDelete(todo) {
    dispatch({ type: DELETE_TODO, todo });
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

    setNewTodo((prevNewTodo) => ({
      ...prevNewTodo,
      [field]: value,
    }));
  }
  return (
    <div>
      <TodoList
        todoList={todoList}
        onTodoEdit={onTodoEdit}
        onTodoDelete={onTodoDelete}
      ></TodoList>
      {addMode ? (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            onAddTodo({ ...todoList, newTodo });
          }}
        >
          <input type="text" name="new-todo" onChange={handleChange} />
          <button>Submit</button>
        </form>
      ) : (
        <button onClick={() => setAddMode(true)}>'Add'</button>
      )}
    </div>
  );
}
