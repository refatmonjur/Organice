import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";
import "./NewHome.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import todoGif from "../../todo.gif";
import showcase from "../../showcase.svg";
import todoImg from "../../todoImg.svg";
import todoImgTwo from "../../todoImgTwo.svg";
import flashcardImg from "../../flashcardImg.svg";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DateRangeIcon from "@mui/icons-material/DateRange";
import NoteIcon from "@mui/icons-material/Note";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function NewHome() {
  const { user } = useUserAuth();
  // const useruiid = await signUp(registerEmail, registerPassword);
  const useruiid = user.uid;
  // const userCollectionRef = doc(db, "user", "FxfgfcgsziWsOWCUxU2ZaA57lU02");
  const [currentUser, setCurrentUser] = useState([]);
  // const [todos, setTodos] = useState([]);
  // "FxfgfcgsziWsOWCUxU2ZaA57lU02"
  async function getUsers(db) {
    const userDocRef = doc(db, "user", user.uid);
    const data = await getDoc(userDocRef);
    console.log(data);
    const fields = [];
    fields.push(data.data());
    console.log(fields);
    setCurrentUser(fields);
  }
  // async function getStudentRecords(db) {
  //   const recordCol = collection(db, "user", user.uid, "todos");
  //   // setLoading(true);
  //   onSnapshot(recordCol, (querySnapshot) => {
  //     const record = [];
  //     querySnapshot.forEach((doc) => {
  //       record.push(doc.data());
  //     });
  //     console.log(record);
  //     setTodos(record);
  //     // setStudentRecord(record);
  //   });
  //   // setLoading(false);
  // }

  useEffect(() => {
    getUsers(db);
    // getStudentRecords(db);
  }, []);

  //  /// this is scrapwork
  //  async function getStudentRecords(db) {
  //   const recordCol = collection(db, 'user', user.uid, "todos");
  //   // setLoading(true);
  //   onSnapshot(recordCol, (querySnapshot) => {
  //       const record = [];
  //       querySnapshot.forEach((doc) => {
  //           record.push(doc.data());
  //       });
  //       console.log(record);
  //       // setStudentRecord(record);
  //   });
  //   // setLoading(false);
  // }
  // var userImage = "";
  // if (user) {
  //   if (user.emailVerified == true) {
  //     userImage = user.photoURL;
  //   }
  // }

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      {/* showcase */}

      <section className="bg-dark text-light p-5 text-sm-start text-center">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1 className="text-sm-start">
                Get work done with
                <span className="text-warning"> Organice</span>
              </h1>
              <p className="lead my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={showcase}
              alt=""
            ></img>
          </div>
        </div>
      </section>

      {/* Boxes */}

      <section className="p-5">
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                  <Link className="btn btn-primary" to="/todo">
                    To do
                  </Link>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                  <Link className="btn btn-dark" to="/flashcard">
                    Flashcard
                  </Link>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                  <Link className="btn btn-primary" to="/calendar">
                    Calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* To dos */}

      <section className="p-5">
        <div className="container shadow-lg">
          <div className="row align-items-center justify-content-between bg-light">
            <div className="col-md p-5">
              <h2 className="mb-3 text-info">To-do List</h2>
              <div className="card text-light bg-secondary mt-2 p-2">
                take the dog out
              </div>
              <div className="card text-light bg-secondary mt-2 p-2">
                do math Homework
              </div>
              <div className="card text-light bg-secondary mt-2 p-2">
                go for a walk
              </div>
              <div className="card text-light bg-secondary mt-2 p-2">
                english essay
              </div>
              <div className="align-items-center">
                <Link className="btn btn-dark mt-4" to="/todo">
                  <ArrowForwardIosRoundedIcon fontSize="small" />
                  TO DO
                </Link>
              </div>
            </div>
            <div className="col-md">
              <img
                className="img-fluid w-85 d-none d-sm-block"
                src={todoImgTwo}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flashcard */}

      <section className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* <h2 className="text-warning p-5">Flashcards</h2> */}
            <div className="col-md">
              <img
                className="img-fluid d-none d-sm-block"
                src={flashcardImg}
                alt=""
              />
            </div>
            <div className="col-md p-5">
              <h2 className="mb-3 text-warning">Your Decks</h2>
              <div className="card text-dark bg-light mt-2 p-2">
                take the dog out
              </div>
              <div className="card text-dark bg-light mt-2 p-2">
                do math Homework
              </div>
              <div className="card text-dark bg-light mt-2 p-2">
                go for a walk
              </div>
              <div className="card text-dark bg-light mt-2 p-2">
                english essay
              </div>
              <div className="align-items-center">
                <Link className="btn btn-info mt-4" to="/flashcard">
                  <ArrowForwardIosRoundedIcon fontSize="small" />
                  FLASHCARD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}

      <section className="p-5">
        <div className="container bg-dark shadow-lg">
          <h2 className="text-center text-danger p-3">Reminders and Events</h2>
          <p className="lead text-center text-light mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="row g-4">
            <div className="col-md-12 col-lg-6">
              <div className="card bg-light shadow-lg">
                <div className="card-body text-center">
                  <div className="card-title">
                    <h4 className="text-primary">Events</h4>
                  </div>
                  <div className="card bg-secondary text-center p-2 mt-2">
                    take out the dog at 10:00 AM
                  </div>
                  <div className="card bg-secondary text-center p-2 mt-2">
                    take out the dog at 10:00 AM
                  </div>
                  <div className="card bg-secondary text-center p-2 mt-2">
                    take out the dog at 10:00 AM
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card bg-light shadow-lg">
                <div className="card-body text-center">
                  <div className="card-title">
                    <h4 className="text-primary">Reminders</h4>
                  </div>
                  <div className="card bg-secondary text-center p-2 mt-2">
                    Meeting from 3:30 - 6:00 PM
                  </div>
                  <div className="card bg-secondary text-center p-2 mt-2">
                    class from 3:30 - 6:00 PM
                  </div>
                  <div className="card bg-secondary text-center p-2 mt-2">
                    Essay from 3:30 - 6:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link className="btn btn-primary mt-4 mb-4" to="/calendar">
              <ArrowForwardIosRoundedIcon fontSize="small" />
              CALENDAR
            </Link>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="p-5 bg-dark text-light text-center position-relative shadow-lg">
        <div className="container">
          <p className="lead">
            Copyright &copy; Senior Design Project Spring 2022
          </p>
        </div>
      </footer>

      {/* these are the old stuff */}

      {/* <div>
        <img src={todoGif} alt="loading..." />
      </div> */}
      {/* <div className="mt-3">
        {user.emailVerified == true && user.photoURL}
        <br />
        {user && user.uid}
        {user && user.email}

        {currentUser.map((users) => {
          return (
            <div>
              <br />
              <h1>Welcome back,{users.firstName}</h1>
              <h1>lastName: {users.lastName}</h1>
            </div>
          );
        })}
      </div> */}
      {/* <div>
        <div className="box_container">
          <h1 className="gradient__text">Todo</h1>
          <div className="todo_container">
            this is the content in the todo
            <br />
            <br />
            container what are the other things
          </div>
          <div className="button_container">
            <Link to="/todo">
              <button className="finish-deck-btn1">To-Do</button>
            </Link>
          </div>
        </div>

    
        <div className="box_container">
          <h1 className="gradient__text">Flashcards</h1>
          <div className="flashcard_container">
            <div>this is flashcard 1</div>
            <div>this ist flashcard 2</div>
          </div>
          <div>
            <Button
              className="finish-deck-btn"
        
            >
              <Link to="/flashcard"> Go to Flashcards</Link>
            </Button>
          </div>
        </div>
       

        <div className="box_container">
          <h1 className="gradient__text">Events</h1>
          <div className="todo_container"></div>
          <Button
            className="finish-deck-btn"
            style={{ marginTop: 220, marginLeft: 600 }}
          >
            <Link to="/calendar"> Go to Calendar</Link>
          </Button>
        </div>
      </div> */}
    </div>
  );
}

export default NewHome;
