import React from "react";
import "./Home.css";
import Navbar from "../NavbarPage/Navbar";
import Footer from "./FooterPage/Footer";
import Header from "./HeaderPage/Header";
import Features from "./Features/features";
import Information from "./InformationPage/information";
import Meet from "./MeetPage/meet";
import image from "./HeaderPage/landingpagePIC.svg";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import imageJustin from './MeetPage/Justin.png'
import imageTanvir from './MeetPage/Tanvir.png'
import imageMd from './MeetPage/Md.png'
import imageRefat from './MeetPage/Refat.png'
import './MeetPage/meet.css';
import DateRangeIcon from "@mui/icons-material/DateRange";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
// import Image from '../HomePage/homelanding.png';
function Home() {
  const { user } = useUserAuth();
  return (
    <div className="Homepage">
      {user ? <NewHomeNavbar /> : <Navbar />}

      {/* HEADER */}
      <section className="bg-dark text-light p-5 text-sm-start text-center">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between ">
            <div>
            <h1 className="text-sm-start">
                Welcome to
                <span className="text-warning"> Organice</span>
              </h1>
              <p className="lead my-4">
                Given a semester long period, we will be creating a flashcard-based
                website that will aid students of all ages. Studying is a key
                component in order to succeed in academic life, and flashcards are an
                effective way to memorize information for upcoming exams and tests.
                There will be additional components such as a calendar and to-do list
                for the user to further organize their academic journey.
              </p>
            </div>             
             <img
                className="img-fluid w-50 d-none d-sm-block"
                src={image}
                alt=""
              ></img>
          </div>
        </div>
      </section>


      {/* INFORMATION ABOUT WEBSITE */}


      <section className="p-5 bg-light">
        <div className="container">
          <div className="row text-center gap-4">
            <div className="col-md">
              <div className="card bg-dark text-light shadow-lg">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i>
                      <HowToRegIcon fontSize="large" />
                    </i>
                  </div>
                  <h3 className="card-title">To do List</h3>
                  <p className="card-text">
                  This is the main feature of our website. 
                  It will be fully responsive with the core flashcard 
                  features such as creating a deck of flashcards, 
                  adding/deleting flashcards from the deck, and studying the flashcard deck.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md ">
              <div className="card bg-secondary text-light shadow-lg">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i>
                      <NoteOutlinedIcon fontSize="large" />
                    </i>
                  </div>
                  <h3 className="card-title">Flashcard</h3>
                  <p className="card-text">
                  The To-do feature is an add-on feature that allows for a user to 
                  plan out what they are going to be doing in the coming days or weeks. 
                  When adding a to-do you have the option of uploading any files that are associated with that to do. 
          
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-dark text-light shadow-lg">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i>
                      <DateRangeIcon fontSize="large" />
                    </i>
                  </div>
                  <h3 className="card-title">Calendar</h3>
                  <p className="card-text">
                  The calendar feature of the website will remind the user of all their upcoming tasks/assignments. 
                  The user can add reminders to each day of the week accompanied by comments and descriptions along with attaching/uploading file(s). 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="p-5 bg-light">
        <div className="container bg-dark text-white p-5">
          <div className="">
            <h1 className="text-sm-start">
              What is Organice?
            </h1>
            <p class="text-justify">
            We want to create an efficient medium for 
            studying/learning/memorizing using flashcards. 
            Providing the users with a variety of flashcard 
            templates for different scenarios. With additional 
            features that assists with time management, using to-do 
            lists and calendar reminders. We want to create a website that 
            helps students study. Using flashcards and timely reminders of to-do 
            lists and calendars, students can achieve academic success. We have 
            looked through different works that already exists such as Quizlet 
            and some aspects of Notion, and have taken inspiration from them. 
            Using Figma, we created a rough foundation of how our 
            website would operate, along with an early rendition of our UI/UX. 
            We plan to develop our application throughout the Spring term, 
            and aim to deploy by April 22, 2022.
            </p>
          </div>

        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="bg-dark">
        <div className='organice__mtt_container section_margin'>
          <div className='organice__mtt-heading'>
            <h1 className='gradient__text'>The Organice Team</h1>
          </div>
          <div className='organice__team'>
            {/* JUSTIN */}
            <div className='member'>
              <img src={imageJustin}
                style={{
                  width: 275,
                  height: 275,
                  borderRadius: 200,
                  border: '3px ridge '
                }} />
              <div className='member-content'>
                <Features title="Justin Siu" text="Frontend Developer" />
              </div>
            </div>

            {/* REFAT */}
            <div className='member'>
              <div className='pic'>
                <img src={imageRefat}
                  style={{
                    width: 275,
                    height: 275,
                    borderRadius: 200,
                    border: '3px ridge '
                  }}
                />
              </div>
              <div className='member-content'>
                <Features title="Refat Monjur" text="Frontend Developer" />
              </div>
            </div>


            {/* MD */}
            <div className='member'>
              <div className='pic'>
                <img src={imageMd}
                  style={{
                    width: 275,
                    height: 275,
                    borderRadius: 200,
                    border: '3px ridge '
                  }}
                />
              </div>
              <div className='member-content'>
                <Features title="Md Islam" text="Backend Developer" />
              </div>
            </div>

            {/* TANVIR */}
            <div className='member'>
              <img
                src={imageTanvir}
                style={{
                  width: 275,
                  height: 275,
                  borderRadius: 200,
                  border: '3px ridge '
                }}
              />
              <div className='member-content'>
                <Features title="Tanvir Youhana" text="Backend Developer" />
              </div>
            </div>
          </div>
        </div>




      </section>



      {/* FOOTER */}
      <div className="">
        <footer className="p-3 bg-dark text-light text-center shadow-lg">
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
export default Home;
