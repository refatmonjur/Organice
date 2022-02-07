import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import "./WindowTodo.css";
import { Link } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";

function WindowTodo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [todos1, setTodos1] = useState([]);
  useEffect(() => {
    // setLoading(true);
    // var today = new DateTime.now();
    // today = new DateTime(today.year, today.month, today.day);
    const TodoCollectionRef = collection(db, "user", user.uid, "todos");
    var today = new Date();
    const todoQuery = query(
      TodoCollectionRef,
      where("dueDate", "<=", today)
    );
    const todoQuery1 = query(
      TodoCollectionRef,
      where("dueDate", "==", "")
    );

    
    // Timestamp.now().toDate()
    const unsub = onSnapshot(todoQuery,(queryS) => {
      const todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });


      // console.log(Timestamp.now().toDate());
      console.log(todosArray);
      setTodos(todosArray);
    });

    const unsub1 = onSnapshot(todoQuery1,(queryS) => {
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
        <div className="left_container">
          {/* <div className="today_button"> */}
          <div className="left_container_button">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              <TodayIcon color="secondary" fontSize="large" />
              Today
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              <DateRangeRoundedIcon color="secondary" fontSize="large" />
              <Link to="/WeeklyTodo">Weekly</Link>
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              <CalendarViewMonthRoundedIcon
                color="secondary"
                fontSize="large"
              />
              <Link to="/MonthlyTodo">Monthly</Link>
            </Button>
          </div>
        </div>
        <div className="right_container">
          <h1 className="gradient__text">Today</h1>
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

export default WindowTodo;
