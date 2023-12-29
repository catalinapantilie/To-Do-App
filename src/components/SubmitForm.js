import { useState } from "react";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { db, auth } from "../config/firebase";

export default function AddTodo({ setTodos }) {
  const [todo, setTodo] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        value: todo,
        isEditing: false,
        completed: false,
        userId: auth?.currentUser?.uid,
      });
      getTodosList();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTodo("");
  };

  const todosCollectionRef = collection(db, "tasks");

  async function getTodosList() {
    try {
      await getDocs(todosCollectionRef).then((querySnapshot) => {
        const filteredData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(filteredData);
        console.log(filteredData);
      });
    } catch (e) {
      console.error("Error document: ", e);
    }
  }

  return (
    <form className="form-todo" onSubmit={addTodo}>
      <input
        className="todo-input"
        value={todo}
        type="text"
        placeholder="What is the task today"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button className="form-btn" type="submit">
        Add Task
      </button>
    </form>
  );
}
