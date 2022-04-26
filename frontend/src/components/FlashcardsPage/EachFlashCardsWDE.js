import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Justin -> added prompt and answer for testing,
//  feel free to get rid of it since it is not needed and is extra
//    prompt was meant to imitate flash.question
//    answer imitates the flash.answer
function EachFlashCardsWDE({ flash, handleDelete, handleEdit }) {
  // const handleDelete = async (flash) => {
  //   const docRef3 = doc(db, "user", user.uid, "flashcard", deckName, "deck", flash);
  //   await deleteDoc(docRef3);
  // };
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

        <div className="flashcard-example">
          <input
            type="text"
            value={flash.example === "" ? newExample : flash.example}
            className="list"
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
