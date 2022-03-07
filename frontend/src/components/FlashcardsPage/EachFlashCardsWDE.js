import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
// Justin -> added prompt and answer for testing, 
//  feel free to get rid of it since it is not needed and is extra
//    prompt was meant to imitate flash.question
//    answer imitates the flash.answer
function EachFlashCardsWDE({ flash, handleDelete}) {
  // const handleDelete = async (flash) => {
  //   const docRef3 = doc(db, "user", user.uid, "flashcard", deckName, "deck", flash);
  //   await deleteDoc(docRef3);
  // };
  console.log(flash.id)
  return (
    <div className="transparentBg2">
      {/* SHOW THIS DIV IF User has no decks in their data */}
      <div className="flashcard-container"
      >
        <div className="flashcard-prompt"
        >
          <p>Word: {flash.word}</p>
        </div>
        <div className="flashcard-answer">
          Definition: {flash.definition}
        </div>
        <div>
        Example: {flash.example}
        </div>
        <div>
        <button>
         edit
        </button>
        </div>
        
        <div>
          <button onClick={()=> handleDelete(flash.id)}>
            <DeleteIcon/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachFlashCardsWDE;
