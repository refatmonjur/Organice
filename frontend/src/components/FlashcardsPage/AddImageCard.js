import React, { useContext } from "react";
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
import { db, storage } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

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

const AddImageCard = () => {
  //Borrowed from Cloudinary Upload Image tutorial
  // const [image, setImage] = useState("");

  // const [url, setUrl] = useState("");
  // const uploadImage = () => {
  //   // const data = new FormData();
  //   // data.append("file", image);
  //   // data.append("upload_preset", "tutorial");
  //   // data.append("cloud_name", "breellz");
  //   // fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload", {
  //   //   method: "post",
  //   //   body: data,
  //   // })
  //   //   .then((resp) => resp.json())
  //   //   .then((data) => {
  //   //     setUrl(data.url);
  //   //   })
  //   //   .catch((err) => console.log(err));

  // };

  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();
  const [deckName, setDeckName] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [purpose, setPurpose] = useState("");
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);
  const types = ["application/pdf", "image/png", "image/jpeg"];
  const [error, setError] = useState(null);
  const [inputFields, setInputField] = useState([
    { word: "", definition: "", purpose: "", url: "" },
    { word: "", definition: "", purpose: "", url: "" },
  ]);
  // const [progress, setProgress] = useState(0);
  console.log(url);
  async function changeUpload(index, e) {
    console.log("changed");
    let selected = e.target.files[0];
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
      // let lol = useStorage(file, inputFields);
      // console.log(lol);
      // const handleChangeInput1 = (index, e) => {
      //   const values = [...inputFields];
      //   console.log(url);
      //   values[index][e.target.name] = userData.getUrl();
      //   setInputField(values);
      // };
      // handleChangeInput1(index, e);
      console.log(selected);
    } else {
      setFile(null);
      setError("Please select an image file or pdf file (png,jepg,pdf)");
    }
    const handleChangeInput1 = (index, e) => {
      console.log("i am here");
      const values = [...inputFields];
      console.log(userData.getUrl());
      console.log(url);
      values[index][e.target.name] = userData.getUrl();
      setInputField(values);
    };
    handleChangeInput1(index, e);
    console.log(inputFields);
    console.log(selected);
  }

  // const uploadFiles = (file) => {
  //   if (!file) return;
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on("state_changed", (snapshot) => {
  //     const prog = Math.round((snapshot.byteTransferred / snapshot.totalBytes) * 100);
  //     setProgress(prog);
  //   }, (err) => console.log(err),
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref)
  //         .then((downloadURL) => {
  //           setFile(downloadURL);
  //     });
  //   }
  //   );
  // }

  const createDeck = async (e) => {
    e.preventDefault();
    // const FlashCardRefs = collection(db, "user", user.uid, "flashcard");
    // const url= await storageRef.getDownloadURL();
    // setURL(url);
    // changeUpload(file);
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
    //   purpose: purpose,
    // //   url: url
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
  const handleChangeInput2 = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = url;
    setInputField(values);
    console.log(inputFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const file = e.target[0].files[0];
    // uploadFiles(file);
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
  console.log(url);

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div style={{ marginBottom: 20 }}>
            Please give your Image Deck a name
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
                <div>Fill in your Word, Image, Definition, and Purpose</div>
                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  placeholder="Enter Word"
                  name="word"
                  value={inputField.word}
                  // onChange={(e) => setWord(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />

                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  placeholder="Enter Definition"
                  name="definition"
                  value={inputField.definition}
                  // onChange={(e) => setDefinition(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />

                <TextareaAutosize
                  className="textfield-White fields-spacing "
                  placeholder="Enter Purpose/Use"
                  name="purpose"
                  value={inputField.purpose}
                  // onChange={(e) => setPurpose(e.target.value)}
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <div
                  className="output"
                  style={{
                    fontWeight: "normal",
                    marginTop: 15,
                    color: "black",
                  }}
                >
                  {error && <div className="error"> {error}</div>}
                  {file && <div> {file.name}</div>}
                  {file && (
                    <ProgressBar
                      file={file}
                      setFile={setFile}
                      setUrl={setUrl}
                    />
                  )}
                </div>

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
                      onChange={(e) => changeUpload(index, e)}
                      style={{
                        color: "blue",
                        marginBottom: 30,
                      }}
                    />
                    {/* <h1> {inputField.url}</h1> */}

                    {/* <button> 
                      Upload
                    </button> */}

                    <Button
                      // onClick={uploadFiles(file)}
                      onClick={(event) => handleChangeInput2(index, event)}
                      style={{
                        backgroundImage:
                          "linear-gradient(89.97deg, #cea9f5 1.84%, #F49867 102.67%)",
                        color: "blue",
                        fontWeight: 500,
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "normal",
                        marginTop: 15,
                        color: "black",
                      }}
                    >
                      {/* {progress}% */}
                    </h4>
                    {/* <div>
                      <img
                        style={{
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          borderRadius: 10,
                          maxHeight: 400,
                        }}
                      />
                    </div> */}
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
        ))}
      </form>
      <div id="flex-containerbtns">
        {/* <Button className="add-card-btn" style={{ marginTop: 20 }}>
          Add Card
        </Button> */}

        <Button
          className="finish-deck-btn"
          style={{ marginTop: 20 }}
          OnClick={createDeck}
        >
          Finish & Save
        </Button>
      </div>
    </div>
  );
};

export default AddImageCard;
