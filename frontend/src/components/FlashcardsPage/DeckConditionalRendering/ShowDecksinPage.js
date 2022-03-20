import React from "react";
import { Button } from "@mui/material";
import "../Flashcard.css";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../../firebase.js";
import { color } from "@mui/system";
import { decomposeColor } from "@mui/lab/node_modules/@mui/system";
import { useHistory } from "react-router-dom";
import StudyFlashCard from "../StudyFlashCards";

export default function ShowDecksinPage({ deck, deleting }) {
  let history = useHistory();
  const [clicked, setClicked] = useState(false);
  console.log(deck);

  console.log(deck.deckTitle);
  console.log(deck.id);
  // onClick={history.push("/addQACard")

  return (
    <div>
      <div
        className="newUser-text center"
        style={{ marginBottom: 50 }}
      >
        <div className="deck-title"> {deck.deckTitle} </div>
        <div>
          <Button onClick={() => { setClicked(true); }}> Study </Button>
          <Button onClick={() => deleting(deck.id)}>Delete</Button>
        </div>
      </div>

      <StudyFlashCard
        key={deck.id}
        deckName={deck.id}
        isOpen={clicked}
        onClose={() => setClicked(false)}
      />

      {/* <StudyFlashCard
          key={deck.id}
          deckName={deck.id}
          isOpen={clicked}
          onClose={() => setClicked(false)}
        /> */}
    </div>
  );
}
