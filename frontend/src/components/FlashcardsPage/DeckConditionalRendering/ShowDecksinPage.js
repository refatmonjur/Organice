import React from "react";
import { Button } from "@mui/material";
// import "../Flashcard.css";
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
      <div className="card bg-dark decksinpage ">
        <h4 className="card-title text-light">{deck.deckTitle}</h4>
        {/* <div className="text-light lead"> {deck.deckTitle} </div> */}
        <div className="d-sm-flex mt-3">
          <div className="m-2">
            <Button
              variant="outlined"
              onClick={() => {
                setClicked(true);
              }}
            >
              Study
            </Button>
          </div>
          <div className="m-2">
            <Button variant="outlined" onClick={() => deleting(deck.id)}>
              Delete
            </Button>
          </div>
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
