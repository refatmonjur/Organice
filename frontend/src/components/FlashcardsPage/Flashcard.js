import React, { useState } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import "./Flashcard.css";
import NoDeckPage from "./DeckConditionalRendering/NoDeckPage.js";
import ShowDecksinPage from "./DeckConditionalRendering/ShowDecksinPage.js";
import { Link } from "react-router-dom";

function Flashcard() {
  // state = {
  //   hasDeck: true
  // }
  const [hasDeck, sethasDeck] = useState(true);

  // Testing variable - delete after implementing backend code for this page
  // var hasDecksinData = this.state.hasDeck; //takes in a Boolean
  // if false, it will say user has no deck
  // if true, it will say user HAS a deck
  // either way User can still create a new deck always to add to their collection

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      {/* Transparent Background */}
      <div className="transparentBg">
        <Button
          className="create-new-deck-button center"
          style={{
            display: "block",
            margin: "auto",
          }}
          // onClick={ }
        >
          <Link to="/addNewDeck">Create New Deck</Link>
        </Button>

        {/* SHOW THIS DIV IF User has no decks in their data */}
        <div>{hasDeck ? <ShowDecksinPage /> : <NoDeckPage />}</div>
      </div>
    </div>
  );
}

export default Flashcard;
