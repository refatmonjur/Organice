import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import Modal from "react-modal";
import EachFlashCards from "./EachFlashCards.js";
import StudyEachCard from "./StudyEachCard.js";

export default function StudyFlashCard({ deckName, isOpen, onClose }) {
  const [decks1, setDecks1] = useState([]);
  const [flashcard, setFlashcard] = useState([]);
  const { user } = useUserAuth();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  useEffect(() => {
    // setLoading(true);
    console.log(deckName);
    const DecksCollectionRef = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    // const todoQuery = query(DecksCollectionRef, orderBy("timeStamp", "desc"));
    const unsub2 = onSnapshot(DecksCollectionRef, (queryS) => {
      // const decksArray = [];
      const flashCardArray = [];
      queryS.forEach((doc) => {
        flashCardArray.push({ ...doc.data(), id: doc.id });
      });
      // console.log(decksArray);
      setDecks1(flashCardArray);
      //   for (let i = 0; i < decksArray.length; i++) {
      //     flashCardArray[i] = decksArray[i].deckTitle;
      //   }
      //   console.log(flashCardArray);
      //   setFlashcard(flashCardArray);
      // });
    });
    return () => unsub2();
  }, []);
  // now decks has all the
  // console.log(decks1.length);
  // console.log(flashcard);
  console.log(deckName);
  console.log(isOpen);
  // console.log(Object.keys(decks1[0]).length); // this is how we get length of the object
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        center
        styles={customStyles}
      >
        <div>
          {/* here have the study Flashcard component which will flip onClick */}
          <StudyEachCard />
        </div>
        <h1>CARDS ON {deckName}: </h1>
        <div>
          {decks1.map((flash) => (
            <div>
              {Object.keys(flash).length == 3 && (
                <EachFlashCards flash={flash} />
              )}
              {Object.keys(flash).length == 4 && (
                <div>
                  <h1>Word: {flash.word}</h1>
                  <h1>Definition: {flash.Defition}</h1>
                  <h1>Example: {flash.example}</h1>
                </div>
              )}
            </div>
            // {/* // here call another component for each flashcards  */}
          ))}
        </div>
        {/* // create a button

                // on the button condition onClick 
                if(decks1[0].length ==2){
                  go to this component
                }
                else if(){ go to the add card with three fields}
                else{
                  go to the other one
                }
                
                */}
      </Modal>
    </div>
  );
}
