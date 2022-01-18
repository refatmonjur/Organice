import React from "react";
import "./Home.css";
import Navbar from "../NavbarPage/Navbar";
import Footer from "./FooterPage/Footer";
import Header from "./HeaderPage/Header";
import Information from "./InformationPage/information";
import Meet from "./MeetPage/meet";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
// import Image from '../HomePage/homelanding.png';

function Home() {
  const { user } = useUserAuth();
  return (
    <div className="Homepage">
      {user ? <NewHomeNavbar /> : <Navbar />}
      <div className="gradient__bg">
        <Header />
      </div>
      <Information />
      <Meet />
      <div style={{ padding: 25 }} />
      <Footer />
    </div>
  );
}
export default Home;
