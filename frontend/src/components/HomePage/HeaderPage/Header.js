import React from "react";
import { Button } from "@mui/material";
import image from "./POGGIES.png";
import "./header.css";
import { useHistory, Link } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (


    



    <div className="bg-dark organice__header section__padding" id="home">
      <div className="organice__header-content">
        <h1 className="gradient__text">Welcome to Organice</h1>
        <p>
          Given a semester long period, we will be creating a flashcard-based
          website that will aid students of all ages. Studying is a key
          component in order to succeed in academic life, and flashcards are an
          effective way to memorize information for upcoming exams and tests.
          There will be additional components such as a calendar and to-do list
          for the user to further organize their academic journey.
        </p>
        <div className="text-white">
          <button
            key="get started"
            path="/signup"
            class="btn btn-success btn-lg "
          >
            <link href="/signup">Get Started</link>
          </button>
        </div>
      </div>

      <div className="organice__header-image">
        <img src={image} />
      </div>
    </div>
  );
}
export default Header;
