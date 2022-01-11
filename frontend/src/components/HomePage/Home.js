import React from "react";
import Navbar from "../NavbarPage/Navbar";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

function Home() {
  const { user } = useUserAuth();
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1>This is the home page when user is not logged in</h1>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
    </div>
  );
}

export default Home;
