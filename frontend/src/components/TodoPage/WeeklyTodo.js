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
import SidebarToDo from './Sidebar/SidebarTodo';


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
      <div className="content_todo">
        {/* LEFT SIDE BAR */}
        <SidebarToDo />
        <div className="right_container">
          <h1 className="gradient__text">Weekly</h1>
          <div className="listing-spacing ">
            {todos.map((todo) => (
              <div class="card card-spacing">
                <div className="card-body listing-bullets">
                  <p class=""> {todo.title}</p>
                  <small class="text-muted italicize">{todo.Description}</small>
                </div>
              </div>
            ))}

            {todos1.map((todo) => (
              <div class="card card-spacing">
                <div className="card-body listing-bullets">
                <p class=""> {todo.title}</p>
                {console.log("Show me name and desc: ", todo.title, ": ", todo.Description)}
                  <small class="text-muted">
                    {todo.Description.length === 0 ? 
                      <i> No Description </i>
                      : 
                      <i class="text-muted">{todo.Description}</i>
                    }
                  </small>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyTodo;
