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
      <div className="newUser-text center">
        <div>
          <Button
            onClick={() => {
              // history.push("/studyFlashCards");
              setClicked(true);
            }}
          >
            {deck.deckTitle}
          </Button>
        </div>
        {/* <div className="testing">{deck.deckTitle}</div> */}
        <div>
          <Button style={{}}>Edit</Button>
          <Button style={{}}>Study</Button>
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
