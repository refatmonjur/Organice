import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { IconButton, Typography } from "@mui/material";
import {
  collection,
  getDoc,
  doc,
  onSnapshot,
  addDoc,
  query,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth } from "../../firebase.js";
import { Button } from "@mui/material";
import AddTodo from "./AddTodo";
import EachTodo from "./EachTodo";
import "./Todo.css";
import HomeIcon from '@mui/icons-material/Home';

export default function Todo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [Loading, setLoading] = useState(false);
  // const [todo, setTodo] = useState("");
  // const [todoEditing, setTodoEditing] = useState(null);
  // const [editingText, setEditingText] = useState("");
  // const [title, setTitle] = useState("");
  // const [input, setInput] = useState("");

  // const TodoCollectionRef = collection(db, "user", user.uid, "todos");

  // async function getTodos(db) {
  //   const TodoCollectionRef = collection(db, "user", user.uid, "todos");
  //   setLoading(true);
  //   onSnapshot(TodoCollectionRef, (queryS) => {
  //     const record = [];
  //     queryS.forEach((doc) => {
  //       record.push(doc.data());
  //     });

  //     // console.log(record);
  //     setTodos(record);
  //     // console.log("i am here");
  //     // setStudentRecord(record);
  //   });
  //   setLoading(false);
  // }

  // async function addTodo() {
  //   console.log("i am here  one");
  //   // setTodos([...todos, input]);
  //   // const TodoCollectionRef = collection(db, "user", user.uid, "todos");
  //   console.log("i am here");
  //   const todoTitle = addDoc(TodoCollectionRef, { title: input });
  //   console.log(todoTitle);
  // }

  useEffect(() => {
    setLoading(true);
    const TodoCollectionRef = collection(db, "user", user.uid, "todos");
    const todoQuery = query(TodoCollectionRef, orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(todoQuery, (queryS) => {
      const todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(todosArray);
      setTodos(todosArray);
    });

    return () => unsub();
  }, []);

  const handleEdit = async (todo, input) => {
    const docRef = doc(db, "user", user.uid, "todos", todo.id);
    await updateDoc(docRef, { title: input });
  };
  const toggleComplete = async (todo) => {
    const docRef2 = doc(db, "user", user.uid, "todos", todo.id);
    await updateDoc(docRef2, { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    const docRef3 = doc(db, "user", user.uid, "todos", id);
    await deleteDoc(docRef3);
  };
  // old useEffects

  // useEffect(() => {
  //   const json = localStorage.getItem("todos");
  //   const loadedTodos = JSON.parse(json);
  //   if (loadedTodos) {
  //     setTodos(loadedTodos);
  //   }
  // }, []);

  // useEffect(() => {
  //   const json = JSON.stringify(todos);
  //   localStorage.setItem("todos", json);
  // }, [todos]);

  // old fnctions

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const newTodo = {
  //     id: new Date().getTime(),
  //     text: todo,
  //     completed: false,
  //   };
  //   setTodos([...todos].concat(newTodo));
  //   setTodo("");
  // }

  // function deleteTodo(id) {
  //   let updatedTodos = [...todos].filter((todo) => todo.id !== id);
  //   setTodos(updatedTodos);
  // }

  // function toggleComplete(id) {
  //   let updatedTodos = [...todos].map((todo) => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // }

  // function submitEdits(id) {
  //   const updatedTodos = [...todos].map((todo) => {
  //     if (todo.id === id) {
  //       todo.text = editingText;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  //   setTodoEditing(null);
  // }

  return (
    


    <div>
      <NewHomeNavbar />
      

      <div id="todo-list">
        <h1 className="gradient__text">Todo List</h1>
        <div className="button_align">
        <AddTodo />
        <div id="home_button">
        <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                <HomeIcon color="secondary" fontSize="large" />
                To-do Lists
        </Button>
        </div>
        
          
        </div>
        <div className="todo_container">
          {todos.map((todo) => (
            <EachTodo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
       


                

        {/* {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div>{todo.text}</div>
              )}
            </div>
            <div className="todo-actions">
              {todo.id === todoEditing ? (
                <button onClick={() => submitEdits(todo.id)}>
                  Submit Edits
                </button>
              ) : (
                <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
