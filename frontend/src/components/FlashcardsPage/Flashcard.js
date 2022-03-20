import React from "react";
import { useState, useEffect, useRef } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import "./Flashcard.css";
import NoDeckPage from "./DeckConditionalRendering/NoDeckPage.js";
import ShowDecksinPage from "./DeckConditionalRendering/ShowDecksinPage.js";
import { Link } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import StudyFlashCard from "./StudyFlashCards";
import EachFlashCards from './EachFlashCards';
import { textAlign } from "@mui/system";

//For Flipping Flashcard
import Flippy, { FrontSide, BackSide } from 'react-flippy';


function Flashcard() {
  // state = {
  //   hasDeck: true
  // }
  let history = useHistory();
  const [hasDeck, sethasDeck] = useState(true);
  const { user } = useUserAuth();
  const [decks, setDecks] = useState([]);
  const [flashcard, setFlashcard] = useState([]);

  //for Flippy package
  const ref = useRef();
  // const [Loading, setLoading] = useState(false);
  // Testing variable - delete after implementing backend code for this page
  // var hasDecksinData = this.state.hasDeck; //takes in a Boolean
  // if false, it will say user has no deck
  // if true, it will say user HAS a deck
  // either way User can still create a new deck always to add to their collection
  useEffect(() => {
    // setLoading(true);
    const DecksCollectionRef = collection(db, "user", user.uid, "flashcard");
    // const todoQuery = query(DecksCollectionRef, orderBy("timeStamp", "desc"));
    const unsub1 = onSnapshot(DecksCollectionRef, (queryS) => {
      const decksArray = [];
      queryS.forEach((doc) => {
        decksArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(decksArray);
      setDecks(decksArray);
    });

    // for (let i = 0; i < decks.length; i++) {
    //   // console.log(decks[i].id);
    //   const flashCollectionRef = collection(
    //     db,
    //     "user",
    //     user.uid,
    //     "flashcard",
    //     decks[i].id,
    //     "deck"
    //   );

    //   // const todoQuery = query(DecksCollectionRef, orderBy("timeStamp", "desc"));
    //   onSnapshot(flashCollectionRef, (queryS1) => {
    //     const flashcardArray = [];
    //     queryS1.forEach((doc) => {
    //       flashcardArray.push({ ...doc.data(), id: doc.id });
    //     });
    //     console.log(flashcardArray);
    //     setFlashcard(flashcardArray);
    //   });
    // }
    return () => unsub1();
    // return () => unsub2();
  }, []);
  const deleting = async (id) => {
    const docRef = doc(db, "user", user.uid, "flashcard", id);
    await deleteDoc(docRef);
  };
  // const editing = async (id) => {
  //   const docRef = doc(db, "user", user.uid, "flashcard", id);
  //   if(decks.length==2){
  //     history.push("/addQACard")
  //   }
  //   else if(decks.length ==3){
  //     history.push("/addDefinitionCard")
  //   }
  //   else{
  //     history.push("/addImageCard")
  //   }
  // };
  // console.log(decks.id);
  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="max-height-flashcard-section"
        style={{
          justifyContent: "center"
        }}
      >
        {/* 1st Transparent Background that shows the list of decks and holds the Create New Deck Button */}
        <div className="transparentBgFlashcard">
          <h3 className="gradient__text"
            style={{
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            Decks
          </h3>
          <Button
            className="create-new-deck-button center"
            style={{
              display: "block",
              margin: "auto",
              marginTop: -55
            }}
          // onClick={ }
          >
            <Link to="/addNewDeck">Create New Deck</Link>
          </Button>
          <div>
            {decks.map((deck) => (
              <div>
                <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting} />
                <div>
                  {/* {flashcard.map((flash) => (
                  <div>
                    <div>{flash.question}</div>
                    <div>{flash.answer}</div>
                  </div>
                ))} */}
                </div>
              </div>
            ))}
            {/* <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting}/> */}
            {/* {hasDeck ? <ShowDecksinPage /> : <NoDeckPage />} */}
          </div>
        </div>

        {/* 2nd Transparent Background that shows the selected Deck and Cards component*/}
        <div id="flex-container-column">
          {/* This div below holds the slideshow for cards in selected deck */}
          <div className="transparentBg background-opacity flashcard-item-size">
            <div className=" flashcard-deck-title gradient__text">
              Selected Deck's Title will be here
            </div>

            {/* Put the flashcard slider here */}
              {/* slider library here */}
              {/* map each one from an array and then into a slide show */}
              {/* each card will then be mapped singularly into a Flippy Card */}
              <Flippy
                flipOnClick={true} // default false 
                flipDirection="vertical"
                ref={ref} 
                style={{ minWidth: '200px', height: '200px' }} /// these are optional style, it is not necessary
              >
                <FrontSide style={{backgroundColor: '#41669d', textAlign: "center"}}> 
                  <p>Prompt</p>
                </FrontSide>

                <BackSide style={{ backgroundColor: '#FFFFFF', textAlign: "center"}}>
                  Answer
                </BackSide>

              </Flippy>




          </div>

          {/* This div below holds the total number of cards list inside the selected deck */}
          <div className="transparentBg">
            <div className=" flashcard-deck-title gradient__text">
              List of Flashcards in Following Deck
            </div>

            {/* SHOW THIS DIV IF User has no decks in their data */}

            <div>

              {/* Flashcard is empty and still in testing */}
              {/* {flashcard.map((flash) => (
                  <div>
                    <EachFlashCards flash={flash} />
                  </div>
                ))} */}
              {/* Instead we use this as a tester for the component parameter passing */}
              {/* <EachFlashCards
                prompt="What does torture mean?"
                answer="pain and suffering"
              />
              <EachFlashCards
                prompt="What does happy meannnnnnnnnnn?"
                answer="good good and great thoughts and positive things "
              /> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Flashcard;
