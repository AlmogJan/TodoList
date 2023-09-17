const { useState } = React;
import { TodoPreview } from "../TodoPreview/TodoPreview.jsx";
export function TodoList({ todoList, onTodoEdit, onTodoDelete }) {
  const [editMode, setEditMode] = useState(null);

  return (
    <ul>
      {todoList.map((todo, idx) => (
        <li key={idx} className="flex space-between align-center">
          <div className="flex space-around align-center">
            <button
              className="img-button"
              onClick={() => onTodoEdit({ ...todo, isDone: !todo.isDone })}
            >
              {todo.isDone ? (
                <img
                  src="assets/img/check_box_FILL0_wght400_GRAD0_opsz24 (1).png"
                  alt="done"
                />
              ) : (
                <img
                  src="assets/img/check_box_outline_blank_FILL0_wght400_GRAD0_opsz24.png"
                  alt="todo"
                />
              )}
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
          <div className="flex space-around align-center">
            <button
              className="img-button"
              onClick={() => {
                setEditMode(todo.id);
              }}
            >
              <img
                src="assets/img/edit_FILL0_wght400_GRAD0_opsz24 (1).png"
                alt="edit"
              />
            </button>
            <button className="img-button" onClick={() => onTodoDelete(todo)}>
              <img
                src="assets/img/delete_FILL0_wght400_GRAD0_opsz24 (1).png"
                alt="delete"
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
