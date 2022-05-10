import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import SidebarToDo from "./Sidebar/SidebarTodo";
import "./WindowTodo.css";

function MonthlyTodo() {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [todos1, setTodos1] = useState([]);
  useEffect(() => {
    const TodoCollectionRef = collection(db, "user", user.uid, "todos");
    var sevenday = Date.now() + 2592000000;
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
    const unsub = onSnapshot(todoQuery, (queryS) => {
      const todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(todosArray);
      setTodos(todosArray);
    });

    const unsub1 = onSnapshot(todoQuery1, (queryS) => {
      const todosArray1 = [];
      queryS.forEach((doc) => {
        todosArray1.push({ ...doc.data(), id: doc.id });
      });
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
        <div className="pt-1 right_container">
          <h1 className="p-3 shadow-lg text-secondary">Monthly</h1>
          <br />
          <div className="listing-spacing ">
            {todos.map((todo) => (
              <div class="card bg-light card-spacing shadow">
                <div className="card-body listing-bullets">
                  <p class="text-dark"> {todo.title}</p>
                  <small class="text-muted italicize">{todo.Description}</small>
                </div>
              </div>
            ))}

            {todos1.map((todo) => (
              <div class="card bg-light card-spacing shadow">
                <div className="card-body listing-bullets">
                  <p class="text-dark"> {todo.title}</p>
                  {console.log(
                    "Show me name and desc: ",
                    todo.title,
                    ": ",
                    todo.Description
                  )}
                  <small class="text-muted">
                    {todo.Description === "" ? (
                      <i> No Description </i>
                    ) : (
                      <i class="text-muted">{todo.Description}</i>
                    )}
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

export default MonthlyTodo;
