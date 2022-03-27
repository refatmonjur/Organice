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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi
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
