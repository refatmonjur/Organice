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
import deck from "./deck.svg";
import StudyFlashCard from "./StudyFlashCards";
import EachFlashCards from './EachFlashCards';
import { textAlign } from "@mui/system";

//For Flipping Flashcard
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { red } from "@mui/material/colors";


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

        <section className="bg-gradient text-light p-4 text-sm-start text-center">
          <div className="container bg-dark shadow-lg ">
            <div className="d-sm-flex align-items-center justify-content-between p-4">
              <div>
                <h1 className="text-sm-start">
                  Welcome to
                  <span className="textcolor1"> Organice's </span>
                  Flashcard Section
                </h1>
                <p className="lead my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi
                </p>
              </div>
              <img
                className="img-fluid w-50 d-none d-sm-block"
                src={deck}
                alt=""
              ></img>
            </div>
          </div>
        </section>


        
      </div>

      <section>
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

          

          <div class="container">
            <div class="row row-cols-4 text-center p-5 mb-2 mt-2">
            
            {decks.map((deck) => (
              <div className="card-body text-center ">
                <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting} />
              </div>
            ))}
            {/* <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting}/> */}
            {/* {hasDeck ? <ShowDecksinPage /> : <NoDeckPage />} */}
          
               {/* <div class="card">CS103</div>
              <div class="card">CS104</div>
              <div class="card">EE210</div>
              <div class="card">EE457</div>
              <div class="card">EE330</div>
              <div class="card">EE312</div>
              <div class="card">CS210</div>
              <div class="card">CS332</div>
              <div class="card">Senior Design</div> */}
            </div>
          </div>

          <Button
            className="create-new-deck-button center"
            style={{
              display: "block",
              margin: "auto",
              marginTop: 0
              // marginTop: -55
            }}
          // onClick={ }
          >
            <Link
              to="/addNewDeck"
              style={{
                textDecoration: "none",
              }}
            >
              Create New Deck
            </Link>
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
      </div>
      </section>
    </div>
  );
}

export default Flashcard;
