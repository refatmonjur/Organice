import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// Backend
import {
  collection,
  setDoc,
  addDoc,
  doc,
  serverTimestamp,
  DocumentReference,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { Link } from "react-router-dom";
// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import {
  Button,
  TextField,
  TextareaAutosize,
  IconButton,
  Icon,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

//CSS
import "./Flashcard.css";

function AddMoreCardQA() {
  const location = useLocation();
  console.log(location.state.decksName);
  const prevDeckName = location.state.decksName; // this is the deck that is selected

  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();

  const [deckName, setDeckName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [inputFields, setInputField] = useState([{ question: "", answer: "" }]);

  // call firebase to add flashcard to deck with the deckName as prevDeckName

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleAddFields = (index) => {
    setInputField([...inputFields, { question: "", answer: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };

  const createDeck = async (e) => {
    e.preventDefault();
    const decksrefs = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      prevDeckName,
      "deck"
    );
    for (let i = 0; i < inputFields.length; i++) {
      await addDoc(decksrefs, inputFields[i]);
      console.log("check firebase");
    }
  };

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div style={{ marginBottom: 20 }}>Title: {prevDeckName}</div>
          <TextField
            // label="Name of Deck"
            className="textfield-White"
            // placeholder="Please enter the name of the Deck"
            fullWidth
            required
            style={stylField}
            value={prevDeckName}
          />
        </div>
      </div>

      {/* Question Answer Add Cards Div */}
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <div className="addnewdeck-header center-text">
              <div id="flex-containerQA">
                <div>Fill in your Question and Answer</div>
                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  placeholder="Enter Question"
                  name="question"
                  value={inputField.question}
                  // onChange={(e) => setQuestion(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  placeholder="Enter Answer"
                  name="answer"
                  value={inputField.answer}
                  // onChange={(e) => setAnswer(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />
              </div>
            </div>
            <IconButton onClick={() => handleRemoveFields(index)}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleAddFields(index)}>
              <AddIcon />
            </IconButton>
          </div>
        ))}
      </form>
      <div id="flex-containerbtns">
        {/* <Button className="add-card-btn" style={{ marginTop: 20 }}>
          Add Card
        </Button> */}

        <Button
          className="finish-deck-btn"
          style={{ marginTop: 20 }}
          onClick={createDeck}
        >
          <Link to="/flashcard"> Finish & Save</Link>
        </Button>
      </div>
    </div>
  );
}

export default AddMoreCardQA;
