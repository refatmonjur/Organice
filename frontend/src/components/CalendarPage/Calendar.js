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
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import "./Calendar.css";

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const calendarRef = useRef(null);
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const TodoCollectionRef = collection(db, "user", user.uid, "todos");
    const todoQuery = query(TodoCollectionRef, where("dueDate", "!=", ""));
    const unsub = onSnapshot(todoQuery, (queryS) => {
      let todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
      console.log("todosArray: " + JSON.stringify(todosArray));
      console.log(todos);
    });

    const eventsCollectionRef = collection(db, "user", user.uid, "events");
    const unsub1 = onSnapshot(eventsCollectionRef, (queryS1) => {
      let eventsArray = [];
      queryS1.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      setEvents(eventsArray);
    });

    return () => [unsub(), unsub1()];
  }, []);

  console.log("events: " + JSON.stringify(events));
  console.log("Todos: " + JSON.stringify(todos));

  const getCalendarEvents = () => {
    for (let i = 0; i < todos.length; i++) {
      const epochTime = todos[i].dueDate.seconds;
      const d = new Date(epochTime * 1000);
      const justDate = new Date(d).toISOString().substring(0, 10);
      console.log("Just date: " + justDate);
      todos[i].start = justDate;
    }

    console.log(events);
    // console.log(events[0].start.seconds);
    for (let i = 0; i < events.length; i++) {
      const epochEventTime = events[i].startDate.seconds;
      console.log(epochEventTime);
      const d2 = new Date(epochEventTime * 1000);
      const justEventDate = new Date(d2).toISOString().substring(0, 10);
      console.log(justEventDate);
      events[i].start = justEventDate;
      const epochEventTimeEnd = events[i].endDate.seconds;
      const d1 = new Date(epochEventTimeEnd * 1000);
      const justEventDate1 = new Date(d1).toISOString().substring(0, 10);
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
              height="auto"
              defaultAllDay="true"
              selectable={true}
              dateClick={handleDateClick}
              weekends={true}
              eventStartEditable={true}
              events={getCalendarEvents()}
            />
          </div>
        </div>

        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          // events={todos}
          onEventAdded={(event) => onEventAdded(event)}
          arg={selectedDate}
        />
      </div>
    </div>
  );
}
