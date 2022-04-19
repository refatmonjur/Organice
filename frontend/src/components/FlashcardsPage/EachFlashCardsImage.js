import React from 'react'
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function EachFlashCardsImage({ flash, handleDelete, handleEdit }) {
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
        <div className="transparentBg2">
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
            <div className="flashcard-answer">
              <input
                type="text"
                value={flash.definition === "" ? newDefinition : flash.definition}
                className="list"
                onChange={handleChangeDefinition}
              />
            </div>
  
            <div>
              <input
                type="text"
                value={flash.example === "" ? newExample : flash.example}
                className="list"
                onChange={handleChangeExample}
              />
            </div>
            <div>
              <button
                className="button-edit"
                style={{
                  height: 10,
                  width: 10,
                }}
                onClick={() =>
                  handleEdit(flash, newWord, newDefinition, newExample)
                }
              >
                <EditIcon />
              </button>
            </div>
  
            <div>
              <button onClick={() => handleDelete(flash.id)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      );
}

export default EachFlashCardsImage;