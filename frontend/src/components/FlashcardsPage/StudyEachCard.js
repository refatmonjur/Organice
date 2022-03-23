import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { useUserAuth } from "../Context/UserAuthContext";
import {
  collection,
  getDoc,
  doc,
  onSnapshot,
  addDoc,
  query,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { handleBreakpoints } from "@mui/system";

function StudyEachCard({ deckName }) {
  // this is the component for studying flashcards and changing to next card
  const ref = useRef();
  const { user } = useUserAuth();
  const [flashCards, setFlashCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  useEffect(() => {
    const DeckCollectionRef = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    const unsub = onSnapshot(DeckCollectionRef, (queryS) => {
      const FlashCardsArray = [];
      queryS.forEach((doc) => {
        FlashCardsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(FlashCardsArray);
      setFlashCards(FlashCardsArray);
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <div className=" flashcard-deck-title gradient__text">{deckName}</div>
      <div>
        <button
          onClick={() => {
            if (currentCard > 0) {
              setCurrentCard(currentCard - 1);
            }
          }}
        >
          prev
        </button>
      </div>
      <div>
        <Flippy
          flipOnClick={true} // default false
          flipDirection="vertical"
          ref={ref}
          style={{ minWidth: "200px", height: "200px" }} /// these are optional style, it is not necessary
        >
          <FrontSide
            style={{ backgroundColor: "#41669d", textAlign: "center" }}
          >
            {flashCards.length > 0 && <p>{flashCards[currentCard].question}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].word}</p>}
          </FrontSide>

          <BackSide style={{ backgroundColor: "#FFFFFF", textAlign: "center" }}>
            {flashCards.length > 0 && <p>{flashCards[currentCard].answer}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].definition}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].example}</p>}
            {/* <p>{flashCards[currentCard].answer}</p> */}
          </BackSide>
        </Flippy>
      </div>
      <div>
        <button
          onClick={() => {
            if (currentCard + 1 < flashCards.length) {
              setCurrentCard(currentCard + 1);
            }
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default StudyEachCard;
