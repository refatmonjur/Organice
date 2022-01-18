import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";

import "./Flashcard.css";

function AddNewDeck() {
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
          ----
        </div>

      </div>



    </div>
  );
}

export default AddNewDeck;
