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
import DragHandle from "@mui/icons-material/DragHandle";

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
  const [inputFields, setInputField] = useState([{ question: "", answer: "" }]);

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
    for (let i = 0; i < inputFields.length; i++) {
      await addDoc(decksrefs, inputFields[i]);
      console.log("check firebase");
    }
  };

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
    console.log("added card");
    console.log("index: ", index);
    setInputField([...inputFields, { question: "", answer: "" }]);
  };

  const handleRemoveFields = (index) => {
    if (index != 0) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputField(values);
    }
  };

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      {/* Enter name of deck */}
      <section className="bg-dark text-light">
        <div className="addnewdeck-header center-text">
          <div id="flex-containerQA">
            <div
              className="gradient__text"
              style={{ marginTop: -40, fontWeight: "bold" }}
            >
              Please give your Q/A Deck a name
            </div>
            <TextField
              label="Please enter the name of the Deck"
              className="textfield-White"
              fullWidth
              required
              style={stylField}
              onChange={(e) => setDeckName(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Question Answer Add Cards Div */}
      <section className="card-body bg-light ">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            paddingBottom: "40%"
            // margin: "20px 20px 20px 20px"
          }} // #0e1a3a90
        >
          {/* PLEASE CHECK THIS LINE, I did this to make there only be ONE Plus sign */}
          {/* <div className="card">
          <IconButton onClick={() => handleAddFields(0)}>
            <AddIcon />
          </IconButton>
        </div> */}
          {inputFields.map((inputField, index) => (
            <div key={index} style={{ marginTop: 5, marginBottom: 5 }}>
              <div className="card">
                <div
                  className="card-header"
                  style={{ justifyContent: "space-around", display: "flex" }}
                >
                  <div>ith Number</div>
                  <div>
                    <IconButton>
                      <DragHandle />
                    </IconButton>
                    {index != 0 && (
                      <IconButton onClick={() => handleRemoveFields(index)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
              <div className="card">
                <div id="flex-containerQArow" className="card-body">
                  <div className="card-body">
                    <TextareaAutosize
                      placeholder=" Enter Question"
                      className="resizeTextarea"
                      name="question"
                      value={inputField.question}
                      // onChange={(e) => setQuestion(e.target.value)}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                    <div className="QAfonts">QUESTION</div>
                  </div>
                  <div className="card-body">
                    <TextareaAutosize
                      placeholder=" Enter Answer"
                      className="resizeTextarea"
                      name="answer"
                      value={inputField.answer}
                      // onChange={(e) => setAnswer(e.target.value)}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                    <div className="QAfonts">ANSWER</div>
                  </div>
                </div>
              </div>
              {index == 0 && (
                <div className="card">
                  <IconButton
                    style={{ color: "teal" }}
                    onClick={() => handleAddFields(index)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              )}
            </div>
          ))}
        </form>
        <div id="flex-containerbtns" className="finish-deck-btn-position">
          {/* <Button className="add-card-btn" style={{ marginTop: 20 }}>
          Add Card
        </Button> */}
          <Button
            className="finish-deck-btn"
            onClick={createDeck}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/flashcard"
            >
              Finish & Save
            </Link>
          </Button>
        </div>

      </section>

      
    </div>
    
  );
}

export default AddQACard;
