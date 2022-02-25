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


//react icons
import * as BsIcons from "react-icons/bs";
import { IconContext } from 'react-icons';

// Imported Tiny Slider to slide the ToDo components
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

export default function Todo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [Loading, setLoading] = useState(false);

  const settings = {
    lazyload: true,
    nav: true,
    mouseDrag: true,
    loop: true,
    items: 1,
    gutter: 5
  };


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
    <div className="todo_page">
      <NewHomeNavbar />
      <div className="title_todolist">
        To-Do List
      </div>
      <div className="content_todo">


        {/* LEFT SIDE BAR */}
        <div className="nav_menu">
          <IconContext.Provider value={{ color: '#fff' }}>

            <li className="menu_btn">
              <Link to="todo">
                <BsIcons.BsCalendarCheck />
                <a>
                  Listing
                </a>
              </Link>
            </li>

            <li className="menu_btn">
              <Link to="/WindowTodo">
                <BsIcons.BsCalendarEvent />
                <a>
                  Today
                </a>

              </Link>
            </li>

            <li className="menu_btn">
              <Link to="/WeeklyTodo">
                <BsIcons.BsCalendarRange />
                <a>
                  Weekly
                </a>
              </Link>
            </li>

            <li className="menu_btn">
              <Link to="/MonthlyTodo">
                <BsIcons.BsCalendar3 />
                <a>
                  Monthly
                </a>
              </Link>
            </li>
          </IconContext.Provider>
        </div>




        {/* RIGHT SIDE BAR */}
        <div className="right_container">
          <div className="todo_container">
            <div id="todo-list">
              {/* <h1 className="gradient__text">Todo List</h1> */}
              <div className="button_align">
                <AddTodo />
              </div>
              <TinySlider settings={settings}>
                {todos.map((todo) => (
                  <EachTodo
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              </TinySlider>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </div>
  );
}
