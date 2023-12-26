import AddTodo from "./SubmitForm";
import Task from "./Task";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function ToDoList() {
  const [todos, setTodos] = useState([]);

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
  useEffect(() => {
    getTodosList();
  }, []); // eslint-disable-line

  return (
    <div className="todoWrapper">
      <h1>To Do List</h1>
      <AddTodo setTodos={getTodosList} />
      {todos.map((todo) => (
        <Task key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
