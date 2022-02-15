import React from "react";
import { Button } from "@mui/material";
import "../Flashcard.css";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../../firebase.js";
import { color } from "@mui/system";
import { decomposeColor } from "@mui/lab/node_modules/@mui/system";
export default function ShowDecksinPage({ deck, deleting, }) {

    // code HERE to render Decks!

    // var decks = [];

    // //      -> pulls from user's database to show decks, 
    // //      with buttons to link to the viewing page of the cards 
    // //      -> to let users test themselves as per Organice's goal
    // decks.push("Deck 1"); //sample data
    // decks.push("Deck 2"); //sample data
    // const deckList = decks.map((i) =>
    //     <div
    //         className="newUser-text center"
    //     >
    //         {i}
    //         <div>
    //             <Button
    //                 style={{

    //                 }}
    //             >
    //                 Edit
    //             </Button>
    //             <Button
    //                 style={{

    //                 }}
    //             >
    //                 Study
    //             </Button>
    //             <Button
    //                 style={{

    //                 }}
    //             >
    //                 Delete
    //             </Button>
    //         </div>
    //     </div>
    // );
console.log(deck.deckTitle)

    return (
<div className="newUser-text center">
      <div className="testing">{deck.deckTitle}</div>
      <div>
        <Button style={{}}>Edit</Button>
        <Button style={{}}>Study</Button>
        <Button onClick={() => deleting(deck.id)}>Delete</Button>
      </div>
    </div>
    );
}
