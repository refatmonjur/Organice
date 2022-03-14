import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
// Justin -> added prompt and answer for testing,
//  feel free to get rid of it since it is not needed and is extra
//    prompt was meant to imitate flash.question
//    answer imitates the flash.answer
<<<<<<< HEAD
function EachFlashCards({ flash, handleDelete, handleEdit2 }) {
=======
function EachFlashCards({ flash, handleDelete, handleEdit }) {
>>>>>>> a011e16bb94ee38de1cf98df99270e917f4d6558
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
    <div className="transparentBg2">
      {/* SHOW THIS DIV IF User has no decks in their data */}
      <div className="flashcard-container">
        <div className="flashcard-prompt">
          {/* <p>Question: {flash.question}</p> */}
          <input
            type="text"
            value={flash.question === "" ? newQuestion : flash.question}
            className="list"
            onChange={handleChangeQuestion}
          />
        </div>
        <div className="flashcard-answer">
          <input
            type="text"
            value={flash.answer === "" ? newAnswer : flash.answer}
            className="list"
            onChange={handleChangeAnswer}
          />
        </div>
        <div>
<<<<<<< HEAD
          <button onClick={() => handleEdit2(flash, newQuestion, newAnswer)}>
=======
          <button onClick={() => handleEdit(flash, newQuestion, newAnswer)}>
>>>>>>> a011e16bb94ee38de1cf98df99270e917f4d6558
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

export default EachFlashCards;