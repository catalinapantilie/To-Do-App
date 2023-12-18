import { useState, useCallback } from "react";
import "./App.css";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { db } from "./config/firebase";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        value: todo,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTodo("");
  };
  const [todos, setTodos] = useState([]);

  useCallback(() => {
    getDocs(collection(db, "tasks")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(todos, newData);
    });
  }, [todos]);

  return (
    <form className="form" onSubmit={addTodo}>
      <input
        className="form-input"
        value={todo}
        type="text"
        placeholder="What is the task today"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button type="submit" className="form-btn">
        Add Task
      </button>
      <div>
        {todos?.map((todo, i) => (
          <p key={i}>{todo.value}</p>
        ))}
      </div>
    </form>
  );
};
export default Todo;
