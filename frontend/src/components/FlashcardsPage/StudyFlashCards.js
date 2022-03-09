import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import Modal from "react-modal";
import EachFlashCards from "./EachFlashCards.js";
import StudyEachCard from "./StudyEachCard.js";
import EachFlashCardsWDE from "./EachFlashCardsWDE.js";
import { useHistory } from "react-router-dom";
import AddMoreCardQA from "./AddMoreCardQA.js";

export default function StudyFlashCards({ deckName, isOpen, onClose }) {
  const [decks1, setDecks1] = useState([]);
  const [flashcard, setFlashcard] = useState([]);
  const { user } = useUserAuth();
  let history = useHistory();
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

  // console.log(decks1[0]);
  // console.log(Object.keys(decks1[0]).length)

  console.log(isOpen);
  const handleDelete = async (id) => {
    const docRef3 = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      id
    );
    await deleteDoc(docRef3);
  };
  const handleAdd = () => {
    if (Object.keys(decks1[0]).length == 3) {
      // push it to the page with word and definition
      history.push({
        pathname: "/addMoreCardQA",
        state: { decksName: deckName },
      });
    } else if (Object.keys(decks1[0]).length == 4) {
      // push it to the page with word and definition
    } else {
      //push it to the page that takes the word, definition, purpose and image
    }
  };

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
          <StudyEachCard deckName={deckName} />
        </div>
        {/* <h1>CARDS ON {deckName}: </h1> */}
        <div className=" flashcard-deck-title gradient__text">
          CARDS ON {deckName}:
        </div>
        <div>
          {decks1.map((flash) => (
            <div>
              {Object.keys(flash).length == 3 && (
                <EachFlashCards flash={flash} handleDelete={handleDelete} />
              )}
              {Object.keys(flash).length == 4 && (
                <EachFlashCardsWDE flash={flash} handleDelete={handleDelete} />
              )}
            </div>
            // {/* // here call another component for each flashcards  */}
          ))}
        </div>
        <div>
          <button onClick={handleAdd}>ADD NEW CARDS</button>
        </div>
      </Modal>

      <div></div>
    </div>
  );
}
