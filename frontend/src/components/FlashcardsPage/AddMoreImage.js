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
import DragHandle from "@mui/icons-material/DragHandle";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
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
    const FlashCardRefs = doc(db, "user", user.uid, "flashcard", prevDeckName);
    var data = {
      deckTitle: prevDeckName,
    };
    if (prevDeckName !== "") {
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
    console.log(e);
    const promises = [];
    let file = e.target[8].files[0];
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
          values1[index][e.target[8].name] = downloadURL;
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
      <section className="bg-dark text-light">
        <div className="addnewdeck-header center-text">
          <div id="flex-containerQA">
            <div
              className="p-2"
              style={{ marginTop: -20, marginBottom: -20, fontWeight: "bold" }}
            >
              Add more cards to
              <span className="text-warning"> {prevDeckName}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="card-body bg-light ">
        {inputFields.map((inputField, index) => (
          <form
            className="bg-light"
            onSubmit={(e) => handleSubmit(index, e)}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              // paddingBottom: "20%",
              // marginBottom: "-60px",
            }} // #0e1a3a90
          >
            <div key={index} style={{ marginTop: 5, marginBottom: 5 }}>
              <div className="card">
                <div
                  className="card-header"
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div className=" mt-2 h5 text-secondary">{index + 1}</div>
                  <div>
                    <IconButton>
                      <DragHandle />
                    </IconButton>

                    <IconButton onClick={() => handleRemoveFields(index)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="card">
                <div id="flex-containerQArow" className="card-body">
                  <div className="card-body">
                    <TextareaAutosize
                      placeholder=" Enter Word"
                      className="resizeTextarea"
                      name="word"
                      value={inputField.word}
                      // onChange={(e) => setQuestion(e.target.value)}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                    <div className="QAfonts">Word</div>
                  </div>
                  <div className="card-body">
                    <TextareaAutosize
                      placeholder=" Enter Definition"
                      className="resizeTextarea"
                      name="definition"
                      value={inputField.definition}
                      // onChange={(e) => setAnswer(e.target.value)}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                    <div className="QAfonts">Definition</div>
                  </div>
                  <div className="card-body">
                    <TextareaAutosize
                      placeholder=" Enter Purpose"
                      className="resizeTextarea"
                      name="purpose"
                      value={inputField.purpose}
                      // onChange={(e) => setAnswer(e.target.value)}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                    <div className="QAfonts">Purpose</div>
                  </div>

                  <div
                    className="whiteBg center"
                    id="flex-containerQA"
                    style={{
                      borderRadius: 10,
                      maxWidth: 1000,
                    }}
                  >
                    <div className="d-flex">
                      <input
                        type="file"
                        className="file-upload-button"
                        name="url"
                        style={{
                          color: "blue",
                          marginBottom: 30,
                        }}
                      />
                      {/* <h1> the file is uploading {progress}</h1> */}
                      {/* <img src={inputField.url}></img> */}

                      <div>
                        {inputField.url != "" && (
                          <div>
                            <img className="photo3" src={inputField.url}></img>
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="bg-dark m-3 upload_button"
                      >
                        <DriveFolderUploadIcon />
                      </button>
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
              {index == inputFields.length - 1 && (
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
          </form>
        ))}

        <div id="flex-containerbtns" className="finish-deck-btn-position">
          <Button className="finish-deck-btn" onClick={createDeck}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/flashcard"
            >
              Finish & Save
            </Link>
          </Button>
        </div>
      </section>
      {/* <div className="addnewdeck-header center-text">
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
      </div> */}
    </div>
  );
};

export default AddMoreImage;
