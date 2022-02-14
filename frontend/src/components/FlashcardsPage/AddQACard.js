import React from "react";
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

// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button, TextField, TextareaAutosize,  IconButton, Icon } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

//CSS
import "./Flashcard.css";

// creating a collection of flashcards
// added decktitle to the flashcard
function AddQACard() {
  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();

  const [deckName, setDeckName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [inputFields, setInputField] = useState([
    { question: '', answer: ''},
  ]);

  // const FlashCardRefs = collection(db, "user", user.uid, "flashcard");
  const createDeck = async (e) => {
    e.preventDefault();
    const FlashCardRefs = doc(db, "user", user.uid, "flashcard", deckName);
    var data = {
      deckTitle: deckName,
    };

    if (deckName !== "") {
      await setDoc(FlashCardRefs, data);
      console.log("check firebase");
    }
    // var data1 = {
    //   question: question,
    //   answer: answer,
    // };
    
    const decksrefs = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    for(let i=0; i<inputFields.length; i++){
      await addDoc(decksrefs, inputFields[i]);
      console.log("check firebase");
    }
  };

  
const handleChangeInput = (index, event) => {
  const values = [...inputFields];
  values[index][event.target.name] = event.target.value;
  setInputField(values);
 };
 
 const handleSubmit= (e) => {
   e.preventDefault();
 
   console.log("InputFields", inputFields);
 };
 
 const handleAddFields = (index) => {
   setInputField([...inputFields, { question: '', answer: ''}])
 };
 
 const handleRemoveFields= (index) => {
 const values = [...inputFields];
 values.splice(index, 1);
 setInputField(values);
 };

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div style={{ marginBottom: 20 }}>
            Please give your Q/A Deck a name
          </div>
          <TextField
            label="Name of Deck"
            className="textfield-White"
            placeholder="Please enter the name of the Deck"
            fullWidth
            required
            style={stylField}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </div>
      </div>

      {/* Question Answer Add Cards Div */}
      <form onSubmit={handleSubmit}>
      {inputFields.map((inputField, index) => 
        (
          <div key= {index}>
      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div>Fill in your Question and Answer</div>
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Question"
            name= "question"
            value= {inputField.question}
            // onChange={(e) => setQuestion(e.target.value)}
            onChange={event => handleChangeInput(index, event)}
          />
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Answer"
            name= "answer"
            value= {inputField.answer}
            // onChange={(e) => setAnswer(e.target.value)}
            onChange={event => handleChangeInput(index, event)}
          />
        </div>
      </div>
      <IconButton
        onClick={() => handleRemoveFields(index)}
      >
        <DeleteOutlineIcon/>
      </IconButton>
      <IconButton
      onClick={() => handleAddFields(index)} 
      >
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
          Finish & Save
        </Button>
      </div>
    </div>
  );
}

export default AddQACard;
