import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";
import "./Flashcard.css";
import NoDeckPage from "./DeckConditionalRendering/NoDeckPage.js";
import ShowDecksinPage from "./DeckConditionalRendering/ShowDecksinPage.js";
import { Link } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
function Flashcard() {
  // state = {
  //   hasDeck: true
  // }
  const [hasDeck, sethasDeck] = useState(true);
  const { user } = useUserAuth();
  const [decks, setDecks] = useState([]);
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
      console.log(decks);
    });
    return () => unsub1();
  }, []);
  const deleting = async (id) => {
    const docRef = doc(db, "user", user.uid, "flashcard", id);
    await deleteDoc(docRef);
  };
  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      {/* Transparent Background */}
      <div className="transparentBg">
        <Button
          className="create-new-deck-button center"
          style={{
            display: "block",
            margin: "auto",
          }}
          // onClick={ }
        >
          <Link to="/addNewDeck">Create New Deck</Link>
        </Button>

        {/* SHOW THIS DIV IF User has no decks in their data */}
        <div>
        {decks.map((deck) => (
            <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting} />
          ))}
          {/* <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting}/> */}
          {/* {hasDeck ? <ShowDecksinPage /> : <NoDeckPage />} */}
          </div> 
      </div>
    </div>
  );
}

export default Flashcard;
