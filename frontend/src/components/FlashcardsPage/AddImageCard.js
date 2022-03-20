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
import { Button, TextField, TextareaAutosize } from "@mui/material";

//CSS
import "./Flashcard.css";
import ProgressBar from "./DeckConditionalRendering/ProgressBar.js";

// function AddImageCard() {

const AddImageCard = () => {
  //Borrowed from Cloudinary Upload Image tutorial
  const [image, setImage] = useState("");

  const [url, setUrl] = useState("");
  const uploadImage = () => {
    // const data = new FormData();
    // data.append("file", image);
    // data.append("upload_preset", "tutorial");
    // data.append("cloud_name", "breellz");
    // fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload", {
    //   method: "post",
    //   body: data,
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setUrl(data.url);
    //   })
    //   .catch((err) => console.log(err));

  };

  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();
  const [deckName, setDeckName] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [purpose, setPurpose] = useState("");
//   const [ url, setUrl] = useState(null);
  const [file, setFile]= useState(null);
  const types= ['application/pdf', 'image/png', 'image/jpeg'];
  const [error, setError] = useState(null);


  const changeUpload = (e) => {
      console.log("changed")
      let selected = e.target.files[0];

      if(selected && types.includes(selected.type)){
        setFile(selected);
        setError("");
      }
      else{
          setFile(null);
          setError("Please select an image file or pdf file (png,jepg,pdf)");
      }
      console.log(selected)
  }



  const createDeck = async (e) => {
    e.preventDefault();
    // const FlashCardRefs = collection(db, "user", user.uid, "flashcard");
    // const url= await storageRef.getDownloadURL();
    // setURL(url);

    const FlashCardRefs = doc(db, "user", user.uid, "flashcard", deckName);
    var data = {
      deckTitle: deckName,
    };

    if (deckName !== "") {
      await setDoc(FlashCardRefs, data);
      console.log("check firebase");
    }
    var data1 = {
      word: word,
      definition: definition,
      purpose: purpose,
    //   url: url  
    };

    const decksrefs = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    await addDoc(decksrefs, data1);
    console.log("check firebase");
  };

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
      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div>Fill in your Word, Image, Definition, and Purpose</div>
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Word"
            onChange={(e) => setWord(e.target.value)}
          />

          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Definition"
            onChange={(e) => setDefinition(e.target.value)}
          />

          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Purpose/Use"
            onChange={(e) => setPurpose(e.target.value)}
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
                onChange={changeUpload}
                style={{
                  color: "blue",
                  marginBottom: 30,
                }}
              />
              <div className= "output">
                  {error && <div className= "error"> {error}</div>}
                  {file && <div> {file.name}</div>}
                  {file && <ProgressBar file= {file} setFile={setFile}/>}

              </div>
              {/* <Button
                onClick={uploadImage}
                style={{
                  backgroundImage:
                    "linear-gradient(89.97deg, #cea9f5 1.84%, #F49867 102.67%)",
                  color: "blue",
                  fontWeight: 500,
                }}
              >
                Upload
              </Button> */}
            </div>
            <div>
              <h4
                style={{
                  fontWeight: "normal",
                  marginTop: 15,
                }}
              >
                Uploaded image will be displayed here
              </h4>
              <div>
                <img
                  src={url}
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: 10,
                    maxHeight: 400,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="flex-containerbtns">
        <Button className="add-card-btn" style={{ marginTop: 20 }}>
          Add Card
        </Button>

        <Button
          className="finish-deck-btn"
          style={{ marginTop: 20 }}
          OnClick={createDeck}
        >
         <Link to="/flashcard"> Finish & Save</Link>
        </Button>
      </div>
    </div>
  );
};

export default AddImageCard;
