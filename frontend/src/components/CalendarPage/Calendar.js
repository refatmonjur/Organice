import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useUserAuth } from "../Context/UserAuthContext";
import { useRef } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import "./Calendar.css";
import Dialog from "@mui/material/Dialog";

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [show, setShow] = useState(false);
  const [hasDueDate, setHasDueDate] = useState(false);
  const [description, setDescription] = useState("");
  const calendarRef = useRef(null);
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsObjTitle, setEventsObjTitle] = useState(null);
  const [eventsObjDate, setEventsObjDate] = useState(null);
  const [eventsObjStartDate, setEventsObjStartDate] = useState(null);
  const [eventsObjEndDate, setEventsObjEndDate] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const TodoCollectionRef = collection(db, "user", user.uid, "todos");
    const todoQuery = query(TodoCollectionRef, where("dueDate", "!=", ""));
    const unsub = onSnapshot(todoQuery, (queryS) => {
      let todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });

    const eventsCollectionRef = collection(db, "user", user.uid, "events");
    const unsub1 = onSnapshot(eventsCollectionRef, (queryS1) => {
      let eventsArray = [];
      queryS1.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      setEvents(eventsArray);
    });

    return () => [unsub(), unsub1()];
  }, []);

  // startDate.seconds == "129381239213"
  // Convert startDate.seconds into the format above
  // const demoArray = {
  //   title: "event3",
  //   start: "2022-04-03T12:30:00",
  //   end: "2022-04-03T12:55:00", // will make the time show
  // };

  const getCalendarEvents = () => {
    for (let i = 0; i < todos.length; i++) {
      const epochTime = todos[i].dueDate.seconds;
      const d = new Date(epochTime * 1000);
      const justDate = new Date(d).toISOString().substring(0, 10);
      todos[i].start = justDate;
    }

    for (let i = 0; i < events.length; i++) {
      const epochEventTime = events[i].startDate.seconds;
      const d2 = new Date(epochEventTime * 1000);
      //const justEventDate = new Date(d2).toISOString().substring(0, 10);
      const justEventDate = new Date(d2).toISOString();

      events[i].start = justEventDate;
      const epochEventTimeEnd = events[i].endDate.seconds;
      const d1 = new Date(epochEventTimeEnd * 1000);
      //const justEventDate1 = new Date(d1).toISOString().substring(0, 10);
      const justEventDate1 = new Date(d1).toISOString();
      events[i].end = justEventDate1;
    }

    const showCalendar = todos.concat(events);
    return showCalendar;
  };

  const onEventAdded = (event) => {
    let currentCalendarApi = calendarRef.current.getApi();
    currentCalendarApi.addEvent(event);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };
  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="size">
        <div
          style={{
            position: "relative",
            zIndex: 0,
          }}
        >
          <div className="fullCalendar">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              aspectRatio="2.4"
              // defaultAllDay="true"
              selectable={true}
              dateClick={handleDateClick}
              weekends={true}
              eventStartEditable={true}
              events={getCalendarEvents()}
              eventClick={function (info) {
                var eventObj = info.event;
                console.log(eventObj);
                setShow(true);
                setEventsObjTitle(eventObj.title);
                if (eventObj.extendedProps.dueDate) {
                  setHasDueDate(true);
                  setEventsObjDate(eventObj.extendedProps.dueDate.seconds);
                  setDescription(eventObj.extendedProps.Description);
                } else {
                  setHasDueDate(false);
                  setEventsObjStartDate(
                    eventObj.extendedProps.startDate.seconds
                  );
                  setEventsObjEndDate(eventObj.extendedProps.endDate.seconds);
                }
              }}
            />
          </div>
        </div>

        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={(event) => onEventAdded(event)}
          arg={selectedDate}
        />
        <Dialog open={show} onClose={handleClose}>
          <h1>You have selected: {eventsObjTitle}</h1>
          {hasDueDate ? (
            <div>
              <h2> Is is due on the: {eventsObjDate}</h2>
              <h2> The Description is: {description}</h2>
            </div>
          ) : (
            <h2>
              The event takes place from: {eventsObjStartDate} to{" "}
              {eventsObjEndDate}
            </h2>
          )}
          {/* <h2>It is due on: {eventsObjDate}</h2> */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Dialog>
      </div>
    </div>
  );
}
