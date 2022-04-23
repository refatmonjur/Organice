import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import Footer from "../HomePage/FooterPage/Footer";
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
import TodayIcon from "@mui/icons-material/Today";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";

//react icons and Sidebar
import * as BsIcons from "react-icons/bs";
import { IconContext } from "react-icons";
import SidebarToDo from "./Sidebar/SidebarTodo";

//Imported ScrollBars for the scrolling of the total ToDolist items
import ScrollBars from "react-scrollbar";

export default function Todo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [Loading, setLoading] = useState(false);

  const scrollBarStyle = {
    height: "600px",
  };

  const todoArray = [];

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

  for (let i = 0; i < todos.length; i++) {
    todoArray.push(
      <EachTodo
        key={todos[i].id}
        todo={todos[i]}
        toggleComplete={toggleComplete}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    );
  }

  return (
    <div className="todo_page">
      <NewHomeNavbar />

      <div className="content_todo">
        {/* LEFT SIDE BAR */}
        <SidebarToDo />

        {/* RIGHT SIDE BAR */}
        <div className="right_container">

          <div id="todo-list">
            <div className="button_align">
              <AddTodo />
            </div>
            <ScrollBars horizontal autoHide={false} style={scrollBarStyle}>
              {todoArray}
            </ScrollBars>
          </div>
        </div>
      </div>
    </div>
      
  );
}
