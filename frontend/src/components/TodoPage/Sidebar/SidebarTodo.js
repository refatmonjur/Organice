import React, { Component } from "react";
import "./SidebarTodo.css";
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";

function SidebarToDo() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark p-5">
      <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4">To-do List</span>
      </a>
      <hr />
      <u1 class="nav nav-pills flex-column mb-auto">
        <li className="menu_btn">
          <Link to="todo">
            <BsIcons.BsCalendarCheck style={{ marginRight: 10 }} />
            Listing
          </Link>
        </li>
        <li className="menu_btn">
          <Link to="/WindowTodo">
            <BsIcons.BsCalendarEvent style={{ marginRight: 10 }} />
            Today
          </Link>
        </li>
        <li className="menu_btn">
          <Link to="/WeeklyTodo">
            <BsIcons.BsCalendarRange style={{ marginRight: 10 }} />
            Weekly
          </Link>
        </li>

        <li className="menu_btn">
          <Link to="/MonthlyTodo">
            <BsIcons.BsCalendar3 style={{ marginRight: 10 }} />
            Monthly
          </Link>
        </li>
      </u1>
    </div>
  );
}
export default SidebarToDo;
