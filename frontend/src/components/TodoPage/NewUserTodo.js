import React from "react";
import Navbar from "../NavbarPage/Navbar";
import "./NewUserTodo.css";
import image from "./task.png";
import { Button, Grid } from '@mui/material';

function NewUserTodo() {
  return (
    <div className="newUserTodo">
      <div>
        <Navbar />
      </div>

      <div className="newUserTodo__middle">
        Welcome to the to-do list section.
        Begin creating your list here:
        {/* TEXT */}
        <div className="newUserTodo__button">
         <Button variant="contained" start making list>
         Start making list
        </Button>
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

      <div className="newUserTodo__bottom">
      <img src = {image} />
        {/* last section */}
        {/* IMAGE */}
      </div>
    </div>
  );
}

export default NewUserTodo;
