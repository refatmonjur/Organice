import React from "react";
import { Button } from "@mui/material";
import "../Flashcard.css";

function NoDeckPage() {
    return (
        <div className="newUser-text center">
            Oops! Looks like you don't have any flashcards. Press the [Create New Deck] Button to get started!
        </div>

    );
}
export default NoDeckPage;