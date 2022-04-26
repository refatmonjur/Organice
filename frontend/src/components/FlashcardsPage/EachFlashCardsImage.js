import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Flashcard.css";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function EachFlashCardsImage({ flash, handleDelete, handleEdit3 }) {
  const [newWord, setNewWord] = useState(flash.word);
  const [newPurpose, setNewPurpose] = useState(flash.purpose);
  const [newDefinition, setNewDefinition] = useState(flash.defintion);
  const [newUrl, setNewUrl] = useState(flash.url);
  const [progress, setProgress] = useState("");
  const handleChangeWord = (e) => {
    e.preventDefault();
    if (flash.complete === true) {
      setNewWord(flash.word);
    } else {
      flash.word = "";
      setNewWord(e.target.value);
    }
  };

  const handleChangeDefinition = (e) => {
    e.preventDefault();
    if (flash.complete === true) {
      setNewDefinition(flash.definition);
    } else {
      flash.definition = "";
      setNewDefinition(e.target.value);
    }
  };

  const handleChangePurpose = (e) => {
    e.preventDefault();
    if (flash.complete === true) {
      setNewPurpose(flash.purpose);
    } else {
      flash.purpose = "";
      setNewPurpose(e.target.value);
    }
  };

  // const handleChangeUrl = (e) => {
  //   e.preventDefault();
  // const promises = [];
  // // let file = e.target[6].files[0];
  // let file = e.target.files[0];
  // if (!file) return;
  // const storageRef = ref(storage, `/files/${file.name}`);
  // const uploadTask = uploadBytesResumable(storageRef, file);
  // promises.push(uploadTask);

  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     const prog = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );
  //     setProgress(prog);
  //   },
  //   (err) => console.log(err),
  //   () => {
  //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       console.log(downloadURL);
  //       // const values1 = [...inputFields];
  //       // setLoading(!loading);
  //       // values1[index][e.target[6].name] = downloadURL;
  //       // setInputField(values1);
  //         setNewUrl(downloadURL);

  //         // if (flash.complete === true) {
  //         //   setNewUrl(downloadURL);
  //         // } else {
  //         //   flash.url = "";
  //         //   setNewUrl(downloadURL);
  //         // }
  //         console.log(newUrl);
  //     });
  //   }
  // );
  // Promise.all(promises).then(() => {
  //   console.log("this is after the promise");
  // });
  // };

  return (
    <div className="card" style={{ margin: 10 }}>
      {/* SHOW THIS DIV IF User has no decks in their data */}
      <div className="flashcard-container">
        {/* <form> */}
        <div className="flashcard-prompt">
          <input
            type="text"
            value={flash.word === "" ? newWord : flash.word}
            className="list"
            onChange={handleChangeWord}
          />
        </div>

        <div className="flashcard-definition">
          <input
            type="text"
            value={flash.definition === "" ? newDefinition : flash.definition}
            className="list"
            onChange={handleChangeDefinition}
          />
        </div>

        <div className="flashcard-image">
          <input
            type="text"
            value={flash.purpose === "" ? newPurpose : flash.purpose}
            className="list"
            onChange={handleChangePurpose}
          />
        </div>

        <div>
          <img className="photo" src={flash.url}></img>
        </div>
        <div className="image_buttons">
          <div>
            <button
              className="btn btn-info m-1"
              onClick={() =>
                handleEdit3(flash, newWord, newDefinition, newPurpose, newUrl)
              }
            >
              <EditIcon />
            </button>
          </div>

          <div>
            <button
              className="btn btn-danger m-1"
              onClick={() => handleDelete(flash.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachFlashCardsImage;
