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
import { Button } from "@mui/material";
import { handleBreakpoints } from "@mui/system";
import "./Flashcard.css";

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
      <div 
        className="deck-cards-title center"
        style={{ justifyContent: "center", fontSize: 22, fontWeight: "bold"}}
      >
        {deckName}
      </div>

      <div className="mb-3">
        <Flippy
          flipOnClick={true} // default false
          flipDirection="vertical"
          ref={ref}
          style={{ 
            minWidth: "200px", 
            height: "350px",
            maxWidth: "50%",
            maxHeight: "50%",
            margin: "0 auto",
            width: "50%"
            }} /// these are optional style, it is not necessary
        >
          <FrontSide
            style={{ 
              color: "white",
              backgroundColor: "rgb(33, 37, 41)",
              fontSize: 20,
              display: "flex",
              justifyContent: 'center', 
              alignItems: 'center',
            
            }}
          >
            {flashCards.length > 0 && <p>{flashCards[currentCard].question}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].word}</p>}
          </FrontSide>

          <BackSide 
            style={{ 
              backgroundColor: "white",
              fontSize: 20,
              display: "flex",
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          >
            {flashCards.length > 0 && <p>{flashCards[currentCard].answer}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].definition}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].example}</p>}
            {flashCards.length > 0 && <p>{flashCards[currentCard].purpose}</p>}
            {flashCards.length > 0 && <img className="photo" src={flashCards[currentCard].url}></img>}
          </BackSide>
        </Flippy>
      </div>
      <div
        style={{ justifyContent: "center", display: "flex", padding: 15 }}
        className="center"
      >
        <button
          className="background-button"
          style={{marginRight: 10, flexGrow: 2,  maxWidth: 300}}
          onClick={() => {
            if (currentCard > 0) {
              setCurrentCard(currentCard - 1);
            }
          }}
        >
          Prev
        </button>
        <button
          className="background-button"
          style={{flexGrow: 2, maxWidth: 300}}
          onClick={() => {
            if (currentCard + 1 < flashCards.length) {
              setCurrentCard(currentCard + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudyEachCard;
