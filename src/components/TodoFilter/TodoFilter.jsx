export function TodoFilter({ setFilter }) {
  return (
    <div>
      <input
        type="radio"
        id="all"
        name="setReadDis"
        value="all"
        onChange={setFilter}
      />
      <label htmlFor="all">All</label>
      <input
        type="radio"
        id="active"
        name="setReadDis"
        value="active"
        onChange={setFilter}
      />
      <label htmlFor="active">Active</label>
      <input
        type="radio"
        id="completed"
        name="setReadDis"
        value="completed"
        onChange={setFilter}
      />
      <label htmlFor="completed">Completed</label>
    </div>
  );
}
