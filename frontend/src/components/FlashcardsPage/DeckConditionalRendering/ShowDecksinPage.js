import React from "react";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StudyFlashCards from "../StudyFlashCards";

export default function ShowDecksinPage({ deck, deleting }) {
  let history = useHistory();
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <div className="card bg-dark decksinpage ">
        <h4 className="card-title text-light">{deck.deckTitle}</h4>
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

      <StudyFlashCards
        key={deck.id}
        deckName={deck.id}
        isOpen={clicked}
        onClose={() => setClicked(false)}
      />
    </div>
  );
}
