import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import "./Flashcard.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";
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
          <Link to="/addNewDeck">Create New Deck</Link>
        </Button>

        <div className="newUser-text center">
          Oops! Looks like you don't have any flashcards. Press the [Create New
          Deck] Button to get started!
        </div>
      </div>
    </div>
  );
=======
import NoDeckPage from "./DeckConditionalRendering/NoDeckPage.js";
import ShowDecksinPage from "./DeckConditionalRendering/ShowDecksinPage.js";

class Flashcard extends React.Component {
  state = {
    hasDeck: true
  }

  render() {

    // Testing variable - delete after implementing backend code for this page
    var hasDecksinData = this.state.hasDeck; //takes in a Boolean
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
              margin: "auto"
            }}
          // onClick={ }
          >
            Create New Deck
          </Button>

          {/* SHOW THIS DIV IF User has no decks in their data */}
          <div>
            {hasDecksinData
              ? <ShowDecksinPage />
              : <NoDeckPage />
            }
          </div>











        </div>
      </div>
    );
  }
>>>>>>> flashcardCont
}

export default Flashcard;
