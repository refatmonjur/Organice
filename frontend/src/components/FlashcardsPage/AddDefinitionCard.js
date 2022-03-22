import React from "react";
import { useState, useEffect } from "react";

// Backend
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button, TextField, TextareaAutosize } from "@mui/material";

//CSS
import "./Flashcard.css";

function AddDefinitionCard() {
  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div style={{ marginBottom: 20 }}>
            Please give your Definition Deck a name
          </div>
          <TextField
            label="Name of Deck"
            className="textfield-White"
            placeholder="Please enter the name of the Deck"
            fullWidth
            required
            style={stylField}
            //onChange={}
          />
        </div>
      </div>

      {/* Question Answer Add Cards Div */}
      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div>Fill in your Word, Definition and Example</div>
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Word"
          />
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Definition"
          />

          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Example"
          />
        </div>
      </div>
      <div id="flex-containerbtns">
        <Button className="add-card-btn" style={{ marginTop: 20 }}>
          Add Card
        </Button>

        <Button className="finish-deck-btn" style={{ marginTop: 20 }}>
          Finish & Save
        </Button>
      </div>
    </div>
  );
}

export default AddDefinitionCard;
