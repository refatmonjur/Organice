import React from "react";
import { useState, useEffect } from "react";

// Backend
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";

//CSS
import "./Flashcard.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar } from 'swiper'
import 'swiper/swiper-bundle.css';


class AddNewDeck extends React.Component {

  render() {
    let deck = []; //we needed a new array to be modified, because we cannot modify the state itself without setState.  

    // {/* Question Answer Container */}
    deck.push(
      <SwiperSlide tag="ul">
        <div id="flex-container">
          <div
            className="darkBlueBg"
          >
            {/* Question */}
            <div
              className="whiteBg center-text"
            >
              Question
            </div>
            {/* Answer */}
            <div
              className="whiteBg center-text"
            >
              Answer
            </div>

          </div>

          {/* Choose Q/A Container Button */}
          <button
            className="add-deck"
          >
            Select
          </button>
        </div>
      </SwiperSlide>
    );

    //{/* Word-Definition-Examples Container */}
    deck.push(
      <SwiperSlide tag="ul">

        <div id="flex-container">
          <div
            className="darkBlueBg"
          >
            {/* Word */}
            <div
              className="whiteBg center-text"
            >
              Word
            </div>
            {/* Definition */}
            <div
              className="whiteBg center-text"
            >
              Definition
            </div>
            {/* Examples */}
            <div
              className="whiteBg center-text"
            >
              Example
            </div>

          </div>
          {/* Choose Q/A/E Container Button */}
          <button
            className="add-deck"
          >
            Select
          </button>


        </div>

      </SwiperSlide>
    );

    //{/* Word-Image-Definition-Use/Purpose Container*/}
    deck.push(
      <SwiperSlide tag="ul">
        <div id="flex-container">
          <div
            className="darkBlueBg"
          >
            {/* Word */}
            <div
              className="whiteBg center-text"
            >
              Word
            </div>
            {/* Image */}
            <div
              className="whiteBg center-text"
              style={{ paddingBlock: 40 }}
            >
              Image
            </div>
            {/* Definition */}
            <div
              className="whiteBg center-text"
            >
              Definition
            </div>
            {/* Use/Purpose */}
            <div
              className="whiteBg center-text"
            >
              Use/Purpose
            </div>

          </div>
          {/* Choose Q/I/D/U Container Button */}
          <button
            className="add-deck"
          >
            Select
          </button>
        </div>
      </SwiperSlide>
    );

    return (
      <div>
        <div>
          <NewHomeNavbar />
        </div>

        <div className="addnewdeck-header center-text">
          Swipe the screen to view flashcard options!
        </div>

        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          spaceBetween={50}
          scrollbar={{ draggable: false }}
          speed={400}
          slidesPerView={1}
          onInit={(swiper) => console.log('Swiper initialized!', swiper)}
          onReachEnd={() => console.log('Swiper end reached!')}
        >
          {deck}
        </Swiper>

      </div>
    );
  }
}


export default AddNewDeck;

