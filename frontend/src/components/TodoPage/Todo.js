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
import { Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { auth } from "../../firebase.js";
import { Button } from "@mui/material";
import AddTodo from "./AddTodo";
import EachTodo from "./EachTodo";
import "./Todo.css";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import ShowDesc from "./ShowDesc";

export default function Todo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [Loading, setLoading] = useState(false);

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

  return (
    <div>
      <NewHomeNavbar />
      {/* <div>
        <Button variant="contained">To do</Button>
      </div> */}

      <div id="todo-list">
        <h1 className="gradient__text">Todo List</h1>
        <div className="button_align">
          <AddTodo />
          <div id="home_button">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              <HomeIcon color="secondary" fontSize="large" />
              <Link to="/WindowTodo">To-do Lists</Link>
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
      </div>
    </div>
  );
}
