import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import "./NewUserTodo.css";
import image from "./task.png";

function NewUserTodo() {
  return (
    <div className="newUserTodo">
      <div>
        <NewHomeNavbar />
      </div>

      <div className="newUserTodo__middle">
        this is my middle
        {/* TEXT */}
        {/* button */}
      </div>

      <div className="newUserTodo__bottom">
        <img src={image} height="450" width="600" />
        {/* last section */}
        {/* IMAGE */}
      </div>
    </div>
  );
}

export default NewUserTodo;
