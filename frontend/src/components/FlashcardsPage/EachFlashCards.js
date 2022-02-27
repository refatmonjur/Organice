import React from "react";

// Justin -> added prompt and answer for testing, 
//  feel free to get rid of it since it is not needed and is extra
//    prompt was meant to imitate flash.question
//    answer imitates the flash.answer
function EachFlashCards({ flash, prompt, answer }) {
  //design each of the flashcards here

  return (
    <div className="flashcard-container"
      style={{
        marginTop: 20
      }}
    >
      {/* flash.question */}
      <div className="flashcard-prompt">
        <p>{prompt}</p>
      </div>

      {/* <div className="divider">|</div> */}

      {/* flash.answer */}
      <div className="flashcard-answer">
          {answer}
      </div>


      {/* <h1> Question: {flash.question}</h1>
      <h1> Answer: {flash.answer}</h1> */}
    </div>
  );
}

export default EachFlashCards;
