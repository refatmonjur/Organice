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
//CSS
import "./Flashcard.css";

function AddDefinitionCard() {
  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();
  const [deckName, setDeckName] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [inputFields, setInputField] = useState([
    { word: "", definition: "", example: "" },
  ]);

  const createDeck = async (e) => {
    e.preventDefault();
    // const FlashCardRefs = collection(db, "user", user.uid, "flashcard");
    const FlashCardRefs = doc(db, "user", user.uid, "flashcard", deckName);
    var data = {
      deckTitle: deckName,
    };

    if (deckName !== "") {
      await setDoc(FlashCardRefs, data);
      console.log("check firebase");
    }
    // var data1 = {
    //   word: word,
    //   definition: definition,
    //   example: example,
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
    setInputField([...inputFields, { word: "", definition: "", example: "" }]);
  };

  const handleRemoveFields = (index) => {
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
            Please give your Definition Deck a name
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
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <div className="addnewdeck-header center-text">
              <div id="flex-containerQA">
                <div>Fill in your Word, Definition and Example</div>
                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  name="word"
                  placeholder="Enter Word"
                  value={inputField.word}
                  // onChange={(e) => setWord(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  name="definition"
                  placeholder="Enter Definition"
                  value={inputField.definition}
                  // onChange={(e) => setDefinition(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />

                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  name="example"
                  placeholder="Enter Example"
                  value={inputField.example}
                  onChange={(event) => handleChangeInput(index, event)}
                  // onChange={(e) => setExample(e.target.value)}
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
//  onClick= {createDeck}
export default AddDefinitionCard;
