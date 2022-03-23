import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import "./NewUserTodo.css";
import image from "./task.png";
import addtasks from "./addtasks.svg";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NewUserTodo() {
  return (
    <div className="newUserTodo">
      <div>
        <NewHomeNavbar />
      </div>

      <section className="bg-light text-light p-5 text-sm-start text-center">
        <div className="container bg-dark shadow-lg">
          <div className="d-sm-flex align-items-center justify-content-between">
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

      <section className="p-5">
      <div className="container bg-dark shadow-lg">
        <div className="textcolor">
        Begin creating your list here:
        </div>
        {/* TEXT */}
        <div className="text-center">
          {/* <Button variant="contained" start making list>
          <Link to="/todo">Start making list</Link> 
          </Button> */}
          <Link className="btn btn-light mt-4 mb-4" to="/todo">
                    Start Making List
                  </Link>
        </div>
        

        {/* <Grid container justify="flex-end">
      <Grid item>
      <Button variant="contained" start making list>
         Start making list
        </Button>
      </Grid>
        </Grid> */}
        {/* button */}
      </div>
      </section>


      <div class="container">
        {/* <img src={image} height="450" width="600" /> */}
        {/* <img src={addtasks} /> */}
        {/* last section */}
        {/* IMAGE */}
      </div>
    </div>
  );
}

export default NewUserTodo;
