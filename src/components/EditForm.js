import { useState } from "react";

export default function EditForm({ todo, editTodo }) {
  const [newToDo, setNewToDo] = useState(todo.value);

  const editTask = async (e) => {
    e.preventDefault();
    editTodo(newToDo, todo.id);
  };

  return (
    <form className="form-todo" onSubmit={() => editTask()}>
      <input
        className="form-input"
        value={newToDo}
        type="text"
        placeholder="Update task"
        onChange={(e) => setNewToDo(e.target.value)}
      ></input>
      <button type="submit" className="form-btn">
        Add Task
      </button>
    </form>
  );
}
