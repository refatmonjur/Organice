import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Input, InputBase } from "@mui/material";

function EachFlashCardsWDE({ flash, handleDelete, handleEdit }) {
  const [newWord, setNewWord] = useState(flash.word);
  const [newDefinition, setNewDefinition] = useState(flash.definition);
  const [newExample, setNewExample] = useState(flash.example);

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

  const handleChangeExample = (e) => {
    e.preventDefault();
    if (flash.complete === true) {
      setNewExample(flash.example);
    } else {
      flash.example = "";
      setNewExample(e.target.value);
    }
  };

  return (
    <div className="card " style={{ margin: 10 }}>
      <div className="flashcard-container">
        <div className="flashcard-prompt">
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

        <div className="flashcard-example">
          <InputBase
            fullWidth
            multiline
            value={flash.example === "" ? newExample : flash.example}
            onChange={handleChangeExample}
          />
        </div>
        <div>
          <button
            className="btn btn-info m-1"
            onClick={() =>
              handleEdit(flash, newWord, newDefinition, newExample)
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
  );
}

export default EachFlashCardsWDE;
