import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Task({ todo, deleteToDo, editToDo, toggleComplete }) {
  return (
    <div className="todo" key={todo.id}>
      <p
        className={`${todo.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.value}
      </p>
      <p> {todo.name}</p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editToDo(todo.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteToDo(todo.id)} />
      </div>
    </div>
  );
}
