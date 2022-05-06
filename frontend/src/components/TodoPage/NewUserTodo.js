import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import "./NewUserTodo.css";
import addtasks from "./addtasks.svg";
import complete from "./complete.svg";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NewUserTodo() {
  return (
    <div className="newUserTodo">
      <div>
        <NewHomeNavbar />
      </div>

      <section className="bg-gradient text-light p-5 text-sm-start text-center">
        <div className="container bg-dark shadow-lg">
          <div className="d-sm-flex align-items-center justify-content-between p-3">
            <div>
              <h1 className="text-sm-start">
              Welcome to
                <span className="textcolor1"> Organice's </span>
                To-do Section
              </h1>
              <p className="lead my-4">
              The To-do feature is an add-on tool that allows users to plan out their activities for the next few days or weeks. 
              This feature contains a page that displays all of your tasks. When you add a to-do, you may choose to upload any files 
              that are linked with it. This can also help you stay organized by allowing you to keep all of the files you need for a 
              specific work on one page rather than having to search through many folders.
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={addtasks}
              alt=""
            ></img>
          </div>
        </div>
      </section>

      <section className="bg-gradient text-light p-5 text-sm-start text-center">
        <div className="container bg-dark shadow-lg">
          <div className="row align-items-center justify-content-between p-3">
            <div className="col-md">
              <img
                className="img-fluid d-none d-sm-block"
                src={complete}
                alt=""
              />
            </div>
            <div className="col-md p-5">
              <h2 className="textcolor">Keep Up to Date With Your Projects</h2>
              <div className="align-items-center ">
              <Link className="btn btn-light btn-block mt-4 mb-4" to="/todo">
                    Start Making List
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    
  );
}

export default NewUserTodo;
