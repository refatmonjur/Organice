import React from "react";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useState, useEffect, useRef } from "react";
function StudyEachCard({deckName}) {
  // this is the component for studying flashcards and changing to next card
  const ref = useRef();
  return (
    <div>
      <div className=" flashcard-deck-title gradient__text">
              {deckName}
            </div>
      <div>
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
    </div>
  );
}

export default StudyEachCard;
