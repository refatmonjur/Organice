import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { db, storage } from "../../firebase.js";
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
  inputAdornmentClasses,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
//CSS
import "./Flashcard.css";
import ProgressBar from "./DeckConditionalRendering/ProgressBar.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useStorage from "./DeckConditionalRendering/useStorage.js";
import { userData } from "../Context/UserData.js";
// function AddImageCard() {

const AddMoreImage = () => {
  const location = useLocation();
  console.log(location.state.decksName);
  const prevDeckName = location.state.decksName; // this is the deck that is selected


  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();
  const [deckName, setDeckName] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [purpose, setPurpose] = useState("");
  const [uurl, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const types = ["application/pdf", "image/png", "image/jpeg"];
  const [error, setError] = useState(null);
  const [inputFields, setInputField] = useState([
    { word: "", definition: "", purpose: "", url: "" },
  ]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [loading, uurl]);

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
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };
  const handleAddFields = (index) => {
    setInputField([
      ...inputFields,
      { word: "", definition: "", purpose: "", url: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };
  async function handleSubmit(index, e) {
    e.preventDefault();
    const promises = [];
    let file = e.target[6].files[0];
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          const values1 = [...inputFields];
          setLoading(!loading);
          values1[index][e.target[6].name] = downloadURL;
          setInputField(values1);
        });
      }
    );
    Promise.all(promises).then(() => {
      console.log("this is after the promise");
    });
  }
  console.log(inputFields);

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div style={{ marginBottom: 20 }}> 
          Title: {prevDeckName}
          </div>
          <TextField
            label="Name of Deck"
            className="textfield-White"
            placeholder="Please enter the name of the Deck"
            fullWidth
            required
            style={stylField}
            value={prevDeckName}
          />
        </div>
      </div>
      <div>
        {inputFields.map((inputField, index) => (
          <form onSubmit={(e) => handleSubmit(index, e)}>
            <div key={index}>
              <div className="addnewdeck-header center-text">
                <div id="flex-containerQA">
                  <div>Fill in your Word, Image, Definition, and Purpose</div>
                  <TextareaAutosize
                    className="textfield-White fields-spacing "
                    placeholder="Enter Word"
                    name="word"
                    value={inputField.word}
                    onChange={(event) => handleChangeInput(index, event)}
                  />

                  <TextareaAutosize
                    className="textfield-White fields-spacing "
                    placeholder="Enter Definition"
                    name="definition"
                    value={inputField.definition}
                    onChange={(event) => handleChangeInput(index, event)}
                  />

                  <TextareaAutosize
                    className="textfield-White fields-spacing "
                    placeholder="Enter Purpose/Use"
                    name="purpose"
                    value={inputField.purpose}
                    onChange={(event) => handleChangeInput(index, event)}
                  />

                  <div
                    className="whiteBg center"
                    id="flex-containerQA"
                    style={{
                      borderRadius: 10,
                      maxWidth: 1000,
                      marginTop: 35,
                    }}
                  >
                    <div id="flex-containerQA">
                      <input
                        type="file"
                        className="file-upload-button"
                        name="url"
                        style={{
                          color: "blue",
                          marginBottom: 30,
                        }}
                      />
                      <h1> the file is uploading {progress}</h1>
                      <img src={inputField.url}></img>

                      <button type="submit">Upload</button>
                    </div>
                    <div>
                      <h4
                        style={{
                          fontWeight: "normal",
                          marginTop: 15,
                          color: "black",
                        }}
                      ></h4>
                    </div>
                  </div>
                </div>
              </div>
              <IconButton onClick={() => handleRemoveFields(index)}>
                <DeleteOutlineIcon />
              </IconButton>
              <IconButton onClick={() => handleAddFields(index)}>
                <AddIcon />
              </IconButton>
            </div>
          </form>
        ))}
      </div>
      <div id="flex-containerbtns">
        <Button
          className="finish-deck-btn"
          style={{ marginTop: 20 }}
          onClick={(e) => createDeck(e)}
        >
          <Link to="/flashcard"> Finish & Save</Link>
        </Button>
      </div>
    </div>
  );
};

export default AddMoreImage;
