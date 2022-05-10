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
import EachFlashCardsImage from "./EachFlashCardsImage.js";

export default function StudyFlashCards({ deckName, isOpen, onClose }) {
  const [decks1, setDecks1] = useState([]);
  const { user } = useUserAuth();
  let history = useHistory();

  useEffect(() => {
    console.log(deckName);
    const DecksCollectionRef = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    const unsub2 = onSnapshot(DecksCollectionRef, (queryS) => {
      const flashCardArray = [];
      queryS.forEach((doc) => {
        flashCardArray.push({ ...doc.data(), id: doc.id });
      });
      setDecks1(flashCardArray);
    });
    return () => unsub2();
  }, []);

  const handleDelete = async (id) => {
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

  const handleAdd = () => {
    if (decks1.length == 0) {
      history.push("/addNewDeck");
    } else if (Object.keys(decks1[0]).length == 3) {
      history.push({
        pathname: "/addMoreCardQA",
        state: { decksName: deckName },
      });
    } else if (Object.keys(decks1[0]).length == 4) {
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
          <StudyEachCard deckName={deckName} />
        </div>

        <section className="bg-dark p-2">
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
