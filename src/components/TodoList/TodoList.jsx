const { useState } = React;
import { TodoPreview } from "../TodoPreview/TodoPreview.jsx";
export function TodoList({ todoList, onTodoEdit, onTodoDelete }) {
  const [editMode, setEditMode] = useState(null);

  return (
    <ul>
      {todoList.map((todo, idx) => (
        <li key={idx}>
          <div>
            <button
              onClick={() => onTodoEdit({ ...todo, isDone: !todo.isDone })}
            >
              isDone
            </button>
            <TodoPreview
              todo={todo}
              isEditMode={editMode === todo.id}
              onEditSubmit={(todoToEdit) => {
                setEditMode(null);
                onTodoEdit(todoToEdit);
              }}
            ></TodoPreview>
          </div>
          <button
            onClick={() => {
              setEditMode(todo.id);
            }}
          >
            Edit
          </button>
          <button onClick={() => onTodoDelete(todo)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
