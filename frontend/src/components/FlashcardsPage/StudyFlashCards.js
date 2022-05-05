import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import Modal from "react-modal";
import EachFlashCards from "./EachFlashCards.js";
import StudyEachCard from "./StudyEachCard.js";
import EachFlashCardsWDE from "./EachFlashCardsWDE.js";
import { useHistory } from "react-router-dom";
import AddMoreCardQA from "./AddMoreCardQA.js";
import EachFlashCardsImage from "./EachFlashCardsImage.js";

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

  const bg = {
    overlay: {
      background: "black",
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
  console.log(decks1.length);
  // now decks has all the
  // console.log(decks1.length);
  // console.log(flashcard);

  // console.log(decks1[0]);
  // console.log(Object.keys(decks1[0]).length)

  console.log(isOpen);
  const handleDelete = async (id) => {
    console.log(decks1.length);
    if (decks1.length == 1) {
      const docRef5 = doc(db, "user", user.uid, "flashcard", deckName);
      await deleteDoc(docRef5);
    } else {
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
    }
  };
  const handleEdit = async (flash, newWord, newDefinition, newExample) => {
    const docRef4 = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      flash.id
    );
    await updateDoc(docRef4, {
      definition: newDefinition,
      example: newExample,
      word: newWord,
    });
  };

  const handleEdit2 = async (flash, newQuestion, newAnswer) => {
    const docRef = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      flash.id
    );
    await updateDoc(docRef, { question: newQuestion, answer: newAnswer });
  };
  const handleEdit3 = async (
    flash,
    newWord,
    newDefinition,
    newPurpose,
    newUrl
  ) => {
    const docRef = doc(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck",
      flash.id
    );
    await updateDoc(docRef, {
      word: newWord,
      definition: newDefinition,
      purpose: newPurpose,
      url: newUrl,
    });
  };

  // const toggleComplete = async (flash) => {
  //   const docRef5 = doc(db, "user",
  //   user.uid,
  //   "flashcard",
  //   deckName,
  //   "deck",
  //   flash.id);
  //   await updateDoc(docRef5, { completed: !flash.completed });
  // };

  const handleAdd = () => {
    if (decks1.length == 0) {
      history.push("/addNewDeck");

      //or the other solution is: when you delete last card the deck is deleted
    } else if (Object.keys(decks1[0]).length == 3) {
      // push it to the page with word and definition
      history.push({
        pathname: "/addMoreCardQA",
        state: { decksName: deckName },
      });
    } else if (Object.keys(decks1[0]).length == 4) {
      // push it to the page with word and definition
      history.push({
        pathname: "/addMoreCardWDE",
        state: { decksName: deckName },
      });
    } else if (Object.keys(decks1[0]).length == 5) {
      history.push({
        pathname: "/addMoreCardImage",
        state: { decksName: deckName },
      });
    }
  };

  // console.log(Object.keys(decks1[0]).length); // this is how we get length of the object
  return (
    <div className="bg-dark">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        center
        style={{
          overlay: {
            backgroundColor: "#292b2c",
          },
          content: {
            background: "##292b2c",
            borderRadius: "4px",
          },
        }}
      >
        <div className="bg-dark">
          {/* here have the study Flashcard component which will flip onClick */}
          <StudyEachCard deckName={deckName} />
        </div>
        {/* <h1>CARDS ON {deckName}: </h1> */}

        <section className="bg-dark p-2">
          {/* <h4 className="mt-2 text-danger text-center">Cards in this deck</h4> */}
          <div
            className="pt-2 pb-2 mb-3"
            style={{
              width: "80%",
              margin: "0 auto",
            }}
          >
            <h4 className="border-bottom border-secondary m-3 text-danger">
              Cards in this deck
            </h4>
            <div>
              {decks1.map((flash) => (
                <div>
                  {Object.keys(flash).length == 3 && (
                    <EachFlashCards
                      flash={flash}
                      handleDelete={handleDelete}
                      handleEdit2={handleEdit2}
                    />
                  )}
                  {Object.keys(flash).length == 4 && (
                    <EachFlashCardsWDE
                      flash={flash}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  )}
                  {Object.keys(flash).length == 5 && (
                    <EachFlashCardsImage
                      flash={flash}
                      handleDelete={handleDelete}
                      handleEdit3={handleEdit3}
                    />
                  )}
                </div>
                // {/* // here call another component for each flashcards  */}
              ))}
            </div>
          </div>
        </section>
        <div>
          <button
            className="btn btn-secondary mt-4 btn-lg center"
            style={{ justifyContent: "center" }}
            onClick={handleAdd}
          >
            ADD NEW CARDS
          </button>
        </div>
      </Modal>

      <div></div>
    </div>
  );
}
