import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Flashcard.css";
import { InputBase } from "@mui/material";

function EachFlashCardsImage({ flash, handleDelete, handleEdit3 }) {
  const [newWord, setNewWord] = useState(flash.word);
  const [newPurpose, setNewPurpose] = useState(flash.purpose);
  const [newDefinition, setNewDefinition] = useState(flash.definition);
  const [newUrl, setNewUrl] = useState(flash.url);
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

  return (
    <div className="card" style={{ margin: 10 }}>
      <div className="flashcard-container">
        <div className="flashcard-word">
          <InputBase
            fullWidth
            multiline
            value={flash.word === "" ? newWord : flash.word}
            onChange={handleChangeWord}
          />
        </div>

        <div className="flashcard-definition">
          <InputBase
            fullWidth
            multiline
            value={flash.definition === "" ? newDefinition : flash.definition}
            onChange={handleChangeDefinition}
          />
        </div>

        <div className="flashcard-image">
          <InputBase
            fullWidth
            multiline
            value={flash.purpose === "" ? newPurpose : flash.purpose}
            onChange={handleChangePurpose}
          />
        </div>

        <div className="p-2">
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
