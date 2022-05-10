import React from "react";
import { useState, useEffect, useRef } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import "./Flashcard.css";
import ShowDecksinPage from "./DeckConditionalRendering/ShowDecksinPage.js";
import { Link } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import deck from "./deck.svg";
import VideoPlayer from "react-video-js-player";
import video from "./video.mp4";
import posterpic from "./poster.png";

function Flashcard() {
  let history = useHistory();
  const [hasDeck, sethasDeck] = useState(true);
  const { user } = useUserAuth();
  const [decks, setDecks] = useState([]);

  const videoSrc = video;
  const poster = posterpic;
  useEffect(() => {
    const DecksCollectionRef = collection(db, "user", user.uid, "flashcard");

    const unsub1 = onSnapshot(DecksCollectionRef, (queryS) => {
      const decksArray = [];
      queryS.forEach((doc) => {
        decksArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(decksArray);
      setDecks(decksArray);
    });

    return () => unsub1();
  }, []);
  const deleting = async (id) => {
    const docRef = doc(db, "user", user.uid, "flashcard", id);
    await deleteDoc(docRef);
  };

  return (
    <div>
      <div className="flashcard__navbar">
        <NewHomeNavbar />
      </div>
      <section className="bg-dark shadow-lg text-light p-4 text-sm-start text-center">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between p-4">
            <div>
              <h1 className="text-sm-start">
                Welcome to
                <span className="textcolor1"> Organice's </span>
                Flashcard Section
              </h1>
              <p className="lead my-4">
                One of Organice's most important characteristics. It has all of
                the standard flashcard functions, including the ability to
                create a deck of flashcards, add/remove flashcards from the
                deck, and study the flashcard deck. The variety of flashcards
                available for customers to add to their decks is what sets us
                apart from the competition. This is to attract a bigger user
                base, since more diversity leads to a wider range of
                applications for the flashcards.
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

      <section className="bg-light text-sm-start p-5 text-center">
        <div className="container text-center p-3 shadow-lg">
          <div>
            <h2 className="border-bottom border-dark text-warning p-2">
              Decks
            </h2>
          </div>

          <div className="each_deck">
            {decks.map((deck) => (
              <ShowDecksinPage key={deck.id} deck={deck} deleting={deleting} />
            ))}
          </div>
          <div>
            <Link className="btn btn-dark btn-lg p-2 mb-3" to="/addNewDeck">
              Create New Deck
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-dark shadow-lg text-light p-4 text-sm-start text-center">
        <div className="container text-center">
          <div className="d-sm-flex align-items-center p-3">
            <div className="VideoJS">
              <h1 className="text-danger text-center mb-2">
                Preview
                <VideoPlayer
                  src={videoSrc}
                  poster={poster}
                  width="720"
                  height="420"
                />
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="p-2 bg-dark text-light text-center position-relative shadow-lg">
        <div className="container">
          <p className="lead">
            Copyright <span className="text-primary">&copy;</span> Senior Design
            Project Spring 2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Flashcard;
