const { useState } = React;

export function TodoPreview({ todo, isEditMode, onEditSubmit }) {
  const [todoToEdit, setTodoToEdit] = useState(todo);
  const { title } = todoToEdit;
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

    setTodoToEdit((prevTodoToEdit) => ({
      ...prevTodoToEdit,
      [field]: value,
    }));
  }
  return isEditMode ? (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onEditSubmit({ ...todoToEdit });
        }}
      >
        <input type="text" name="title" value={title} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  ) : (
    <div>
      <h4>{!todo.isDone ? todo.title : "done"}</h4>
      <p>{todo.createdAt.toLocaleString()}</p>
    </div>
  );
}
