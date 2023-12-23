import { useState, useEffect } from "react";
import "./App.css";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { db } from "./config/firebase";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        value: todo,
      });
      console.log("Document written with ID: ", docRef.id);
      getTodosList();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTodo("");
  };
  const todosCollectionRef = collection(db, "tasks");

  const getTodosList = async () => {
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
  };
  useEffect(() => {
    getTodosList();
  }, []);

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
      <div className="todo">
        {todos?.map((todo) => (
          <p key={todo}>{todo.value}</p>
        ))}
      </div>
    </form>
  );
};
export default Todo;
