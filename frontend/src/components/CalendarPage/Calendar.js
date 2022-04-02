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
    return () => unsub();
  }, []);

  console.log("Todos: " + todos);
  for (let i = 0; i < todos.length; i++) {
    const epochTime = todos[i].dueDate.seconds;
    const d = new Date(epochTime * 1000);
    const justDate = new Date(d).toISOString().substring(0, 10);
    console.log("Just date: " + justDate);
    todos[i].start = justDate;
  }

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
              events={todos}
            />
          </div>
        </div>

        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          events={todos}
          onEventAdded={(event) => onEventAdded(event)}
          arg={selectedDate}
        />
      </div>
    </div>
  );
}
