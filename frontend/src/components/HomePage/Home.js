import React from "react";
import Navbar from "../NavbarPage/Navbar";
import { auth } from "../../firebase.js";

function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1>This is the home page when user is not logged in</h1>
    </div>
  );
}

export default Home;
