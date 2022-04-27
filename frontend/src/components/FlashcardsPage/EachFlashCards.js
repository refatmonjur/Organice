import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { InputBase, TextField } from "@mui/material";
// Justin -> added prompt and answer for testing,
//  feel free to get rid of it since it is not needed and is extra
//    prompt was meant to imitate flash.question
//    answer imitates the flash.answer
function EachFlashCards({ flash, handleDelete, handleEdit2 }) {
  const [newQuestion, setNewQuestion] = useState(flash.question);
  const [newAnswer, setNewAnswer] = useState(flash.answer);

  const handleChangeQuestion = (e) => {
    e.preventDefault();
    if (flash.complete === true) {
      setNewQuestion(flash.question);
    } else {
      flash.question = "";
      setNewQuestion(e.target.value);
    }
  };
  const handleChangeAnswer = (e) => {
    e.preventDefault();
    if (flash.complete === true) {
      setNewAnswer(flash.answer);
    } else {
      flash.answer = "";
      setNewAnswer(e.target.value);
    }
  };

  return (
    <div className="card" style={{ margin: 10 }}>
      {/* SHOW THIS DIV IF User has no decks in their data */}
      <div className="flashcard-container">
        <div className="flashcard-prompt">
          {/* <p>Question: {flash.question}</p> */}
          <InputBase
            fullWidth
            multiline
            value={flash.question === "" ? newQuestion : flash.question}
            onChange={handleChangeQuestion}
          />
        </div>
        <div className="flashcard-answer">
          <InputBase
            fullWidth
            multiline
            // className="input_size"
            value={flash.answer === "" ? newAnswer : flash.answer}
            onChange={handleChangeAnswer}
          />
        </div>
        <div className="image_buttons">
          <div>
            <button
              className="btn btn-info m-1"
              onClick={() => handleEdit2(flash, newQuestion, newAnswer)}
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

export default EachFlashCards;
