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
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTodo("");
  };
  const todosCollectionRef = collection(db, "tasks");

  const getTodosList = async () => {
    try {
      await getDocs(todosCollectionRef).then((data) => {
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(filteredData);
        console.log(filteredData);
      });
    } catch (e) {
      console.error("Error list documents: ", e);
    }
  };
  useEffect(() => {
    getTodosList(); // eslint-disable-next-line
  }, []);
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
