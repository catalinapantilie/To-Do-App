import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Task({ todo }) {
  return (
    <div className="todo" key={todo.id}>
      <p>{todo.value}</p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}
