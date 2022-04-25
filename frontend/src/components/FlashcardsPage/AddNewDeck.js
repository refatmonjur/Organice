import React from "react";
import { useState, useEffect } from "react";
import './Flashcard.css';

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
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { margin, minHeight, width } from "@mui/system";

function AddNewDeck() {
  return (
    <div className="bg-dark">

      <div>
        <NewHomeNavbar />
      </div>

      {/* Banner below navbar */}
      <section className="bg-dark text-light text-center m-4">
        <p className="h6">
          Select a Deck type below
        </p>
      </section>

      {/* Middle Section of Page */}
      <div className="bg-light row"
        style={{
          padding: "5%",
          margin: "auto",
          justifyContent:"space-between",
          paddingBottom: "auto",
          minHeight: "75vh"
        }}>
        <div className="card p-3"
          style={{
            margin: "5%",
            width: "20%",
            height: "50%"
          }}>
          <img src="..." class="card-img-top" alt="IMAGE PREVIEW OF CARD HERE"></img>
          <h5 class="card-title">Q/A Deck</h5>
          <p class="card-text">A Deck that contains two fields, usually for question and answer cards.</p>
          <a href="/addQACard" class="btn btn-success">Select</a>
        </div>

        <div className="card p-3"
          style={{
            margin: "5%",
            width: "20%",            
            height: "50%"
          }}>
          <img src="..." class="card-img-top" alt="IMAGE PREVIEW OF CARD HERE"></img>
          <h5 class="card-title">Definition Deck</h5>
          <p class="card-text">A Deck that contains three fields for word, definition, and exmaple cards.</p>
          <a href="/addDefinitionCard" class="btn btn-success">Select</a>
        </div>

        <div className="card p-3"
          style={{
            margin: "5%",
            width: "20%",
            height: "50%"
          }}>
          <img src="..." class="card-img-top" alt="IMAGE PREVIEW OF CARD HERE"></img>
          <h5 class="card-title">Image Deck</h5>
          <p class="card-text">A Deck that contains four fields for word, definition, image and example cards.</p>
          <a href="/addImageCard" class="btn btn-success">Select</a>
        </div>
      </div>

      {/* footer */}
      <div className="footer">
        <footer className="p-3 bg-dark text-light text-center position-relative shadow-lg">
          <div className="container">
            <p className="h6">
              Copyright <span className="text-primary">&copy;</span> Senior Design
              Project Spring 2022
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AddNewDeck;
