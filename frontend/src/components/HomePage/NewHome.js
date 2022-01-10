import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { auth } from "../../firebase.js";

function NewHome() {
  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>
      <h1>User is logged in</h1>
    </div>
  );
}

export default NewHome;
