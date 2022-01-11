import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

function NewHome() {
  const { user } = useUserAuth();
  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>
      <h1>User is logged in</h1>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
    </div>
  );
}

export default NewHome;
