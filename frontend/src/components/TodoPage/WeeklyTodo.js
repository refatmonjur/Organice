import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import "./WindowTodo.css";
import { Link } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";

//react icons
import * as BsIcons from "react-icons/bs";
import { IconContext } from 'react-icons';


function WeeklyTodo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [todos1, setTodos1] = useState([]);
  useEffect(() => {
    // setLoading(true);
    // var today = new DateTime.now();
    // today = new DateTime(today.year, today.month, today.day);
    const TodoCollectionRef = collection(db, "user", user.uid, "todos");
    var sevenday = Date.now() + 604800000;
    // console.log(Date.now());
    // console.log(sevenday);
    var beginningDateObject = new Date(sevenday);
    const todoQuery = query(
      TodoCollectionRef,
      where("dueDate", "<", beginningDateObject),
      where("completed", "==", false)
    );
    const todoQuery1 = query(
      TodoCollectionRef,
      where("dueDate", "==", ""),
      where("completed", "==", false)
    );

    // Timestamp.now().toDate()
    const unsub = onSnapshot(todoQuery, (queryS) => {
      const todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      // console.log(Timestamp.now().toDate());
      console.log(todosArray);
      setTodos(todosArray);
    });

    const unsub1 = onSnapshot(todoQuery1, (queryS) => {
      const todosArray1 = [];
      queryS.forEach((doc) => {
        todosArray1.push({ ...doc.data(), id: doc.id });
      });
      // console.log(Timestamp.now().toDate());
      console.log(todosArray1);
      setTodos1(todosArray1);
    });

    return () => unsub();
    return () => unsub1();
  }, []);

  return (
    <div>
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
        <div className="right_container">
          <h1 className="gradient__text">Weekly</h1>
          <div className="todo_container">
            {todos.map((todo) => (
              <li>{todo.title}</li>
            ))}
            {todos1.map((todo) => (
              <li>{todo.title}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyTodo;
