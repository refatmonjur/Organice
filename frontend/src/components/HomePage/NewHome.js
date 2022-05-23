import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import {
  collection,
  getDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  limitToLast,
} from "firebase/firestore";
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
  const [todos, setTodos] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { user } = useUserAuth();
  const [decks, setDecks] = useState([]);
  const [flashcard, setFlashcard] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [notification, setNotification] = useState([]);
  const [notification1, setNotification1] = useState([]);
  const [events, setEvents] = useState([]);

  async function getUsers(db) {
    const userDocRef = doc(db, "user", `${user.uid}`);
    const data = await getDoc(userDocRef);
    console.log(data);
    const fields = [];
    fields.push(data.data());
    console.log(fields);
    setCurrentUser(fields);
  }

  useEffect(() => {
    getUsers(db);

    const TodoCollectionRef = collection(db, "user", `${user.uid}`, "todos");
    const EventCollectionRef = collection(db, "user", `${user.uid}`, "events");
    const todoQuery = query(TodoCollectionRef, where("dueDate", "!=", ""));
    const unsub = onSnapshot(todoQuery, (queryS) => {
      const todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      // console.log(todosArray);
      setTodos(todosArray);
    });

    const DecksCollectionRef = collection(
      db,
      "user",
      `${user.uid}`,
      "flashcard"
    );
    const unsub1 = onSnapshot(DecksCollectionRef, (queryS1) => {
      const decksArray = [];
      queryS1.forEach((doc) => {
        decksArray.push({ ...doc.data(), id: doc.id });
      });
      // console.log(decksArray);
      setDecks(decksArray);
    });

    const unsubevents = onSnapshot(EventCollectionRef, (queryS1) => {
      const eventsArray = [];
      queryS1.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      setEvents(eventsArray);
    });

    // Notification Functionality
    console.log(Date.now());
    var today = new Date();
    console.log(today);
    // set range
    var beginningDateObject = new Date();
    beginningDateObject.setHours(0, 0, 0, 0);

    var endDate = new Date(new Date().setHours(23, 59, 59, 999));
    console.log(beginningDateObject);
    console.log(endDate);
    // display todays query
    const notifquery = query(
      TodoCollectionRef,
      where("dueDate", ">", beginningDateObject),
      where("dueDate", "<", endDate),
      where("completed", "==", false),
      orderBy("dueDate", "asc"),
      limitToLast(2)
    );

    const unsubs = onSnapshot(notifquery, (queryS) => {
      const noti = [];
      queryS.forEach((doc) => {
        noti.push({ ...doc.data(), id: doc.id });
      });

      // console.log(Timestamp.now().toDate());
      console.log(noti);
      setNotification(noti);
    });
    console.log(notification);

    // event notifcation
    const eventquery = query(
      EventCollectionRef,
      where("startDate", ">=", beginningDateObject),
      where("startDate", "<", endDate),
      orderBy("startDate", "desc"),
      limitToLast(2)
    );

    const unsubs1 = onSnapshot(eventquery, (queryS) => {
      const events = [];
      queryS.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id });
      });

      console.log(events);
      setNotification1(events);
    });

    return () => [unsub1(), unsubs(), unsubs1, unsubevents];
    // getStudentRecords(db);
  }, []);

  const handleDate = (todo) => {
    const date = new Date(todo.dueDate.toDate());
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const new_date = date.toLocaleDateString(undefined, options);
    return new_date;
  };

  const handleDate1 = (events) => {
    const date = new Date(events.startDate.toDate());
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const new_date = date.toLocaleDateString(undefined, options);
    return new_date;
  };
  const handleDate2 = (events) => {
    const date = new Date(events.endDate.toDate());
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const new_date = date.toLocaleDateString(undefined, options);
    return new_date;
  };
  return (
    <div className="bg-dark">
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
                Organice's goal was to create an efficient medium for
                studying/learning/memorizing using flashcards. Providing the
                users with a variety of flashcard templates for different
                scenarios. With additional features that assists with time
                management, using to-do lists and calendar reminders.
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={showcase}
              alt=""
            ></img>
          </div>
          <p className="text-primary">Todays Notifications:</p>
          <div>
            {notification.map((notif) => (
              <div className="card text-light bg-secondary mt-2 p-2">
                {notif.title}
                <small class="italicize">{handleDate(notif)}</small>
              </div>
            ))}
          </div>

          <p className="mt-3 text-primary">Todays Events:</p>
          <div>
            {notification1.map((events) => (
              <div className="card text-light bg-secondary mt-2 p-2">
                {events.title}
                <small class="italicize">
                  {" "}
                  Start Date: {handleDate1(events)}
                </small>
                <small class="italicize">
                  {" "}
                  End Date: {handleDate2(events)}{" "}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boxes */}

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
                    The To-do feature is an add-on tool that allowing users to
                    plan out their activities for the next few days or weeks.
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
                    Flashcards may be used to create a flashcard deck,
                    add/remove flashcards from the deck, and study the flashcard
                    deck.
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
                    The Calendar function will remind users of all impending
                    tasks/assignments along with comments and descriptions.
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
          <div className="row align-items-center justify-content-between">
            <div className="col-md p-5">
              <h2 className="mb-3 text-info">To-do List</h2>
              {todos.map((todo) => (
                <div className="card text-light bg-secondary mt-2 p-2">
                  {todo.title}
                </div>
              ))}
              <div className="align-items-center">
                <Link className="btn btn-info mt-4" to="/todo">
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
        <div className="container p-2 border-top border-light">
          <div className="row align-items-center justify-content-between">
            {/* <h2 className="text-warning p-5">Flashcards</h2> */}
            <div className="col-md pt-2">
              <img
                className="img-fluid w-79 d-none d-sm-block"
                src={flashcardImg}
                alt=""
              />
            </div>
            <div className="col-md p-5">
              <h2 className="mb-3 text-warning">Your Decks</h2>
              {decks.map((deck) => (
                <div className="card text-dark bg-light mt-2 p-2">
                  {deck.deckTitle}
                </div>
              ))}
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

      <section className="p-5 bg-light shadow-md">
        <div className="container shadow-lg">
          <h2 className="text-center text-danger p-3 pt-5">
            Reminders and Events
          </h2>
          <p className="lead text-center text-dark mb-5">
            Here are your upcoming To-do Events and Calendar Reminders:
          </p>
          <div className="row g-4">
            <div className="col-md-12 col-lg-6">
              <div className="card bg-dark shadow-lg">
                <div className="card-body text-center">
                  <div className="card-title">
                    <h4 className="text-info">Events</h4>
                  </div>
                  <div>
                    {events.map((events) => (
                      <div className="card bg-light text-center p-2 mt-2">
                        {" "}
                        {events.title} {handleDate1(events)} -{" "}
                        {handleDate2(events)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-6">
              <div className="card bg-dark shadow-lg">
                <div className="card-body text-center">
                  <div className="card-title">
                    <h4 className="text-info">Reminders</h4>
                  </div>
                  {todos.map((todo) => (
                    <div className="card bg-light text-center p-2 mt-2">
                      {" "}
                      {todo.title}
                      {todo.dueDate === "" ? "" : " at " + handleDate(todo)}
                    </div>
                  ))}
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
            Copyright <span className="text-primary">&copy;</span> Senior Design
            Project Spring 2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default NewHome;
