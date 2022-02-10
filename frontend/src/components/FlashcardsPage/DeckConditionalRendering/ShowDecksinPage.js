import React from "react";
import { Button } from "@mui/material";
import "../Flashcard.css";

function ShowDecksinPage() {

    // code HERE to render Decks!

    var decks = [];

    //      -> pulls from user's database to show decks, 
    //      with buttons to link to the viewing page of the cards 
    //      -> to let users test themselves as per Organice's goal
    decks.push("Deck 1"); //sample data
    decks.push("Deck 2"); //sample data
    const deckList = decks.map((i) =>
        <div 
            className="newUser-text center"
        >
            {i}
            <div>
                <Button
                    style={{

                    }}
                >
                    Edit
                </Button>
                <Button
                    style={{

                    }}
                >
                    Study
                </Button>
                <Button
                    style={{

                    }}
                >
                    Delete
                </Button>
            </div>
        </div>
    );


    return (
        <div>
            {deckList}
        </div>
    );
}
export default ShowDecksinPage;