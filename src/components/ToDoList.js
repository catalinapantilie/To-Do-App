import AddTodo from "./SubmitForm";
import Task from "./Task";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";

export default function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newToDo, setNewToDo] = useState("");

  const userId = auth?.currentUser?.uid;

  async function getTodosList() {
    const todosCollectionRef = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );
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
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  const deleteToDo = async (id) => {
    const toDoDoc = doc(db, "tasks", id);
    await deleteDoc(toDoDoc);
    console.log("delete", id);
    getTodosList();
  };

  function editTodo(id) {
    console.log("click");
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }
  const updateTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { value: newToDo });
    getTodosList();

    setNewToDo("");
  };

  useEffect(() => {
    getTodosList();
  }, []); // eslint-disable-line

  return (
    <div className="todoWrapper">
      <h1>To Do List</h1>
      <AddTodo setTodos={getTodosList} />
      {todos.map((todo, i) =>
        todo.isEditing ? (
          <div>
            <input
              className="todo-input"
              key={i}
              value={newToDo}
              type="text"
              placeholder="Update task"
              onChange={(e) => setNewToDo(e.target.value)}
            ></input>
            <button
              type="submit"
              className="form-btn"
              onClick={() => updateTask(todo.id)}
            >
              Add Task
            </button>
          </div>
        ) : (
          <Task
            key={todo.id}
            todo={todo}
            deleteToDo={deleteToDo}
            editToDo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
}
