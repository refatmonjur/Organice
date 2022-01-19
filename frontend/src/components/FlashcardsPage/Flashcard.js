import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import "./Flashcard.css";

function Flashcard() {
  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      {/* Transparent Background */}
      <div className="transparentBg">
        <Button 
          className="create-new-deck-button center"
        // onClick={ }
        >
          Create New Deck
        </Button>

        <div className="newUser-text center">
          Oops! Looks like you don't have any flashcards. Press the [Create New Deck] Button to get started!
        </div>

      </div>



    </div>
  );
}

export default Flashcard;
