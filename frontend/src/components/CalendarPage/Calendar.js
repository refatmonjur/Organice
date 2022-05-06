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
import { DialogContent } from "@mui/material";
import { Button } from "@mui/material";
import {
  collection,
  onSnapshot,
  query,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import "./Calendar.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DescriptionIcon from "@mui/icons-material/Description";
import DialogActions from "@mui/material/DialogActions";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [show, setShow] = useState(false);
  const [hasDueDate, setHasDueDate] = useState(false);
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const calendarRef = useRef(null);
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsObjTitle, setEventsObjTitle] = useState(null);
  const [eventsObjDate, setEventsObjDate] = useState(null);
  const [eventsObjStartDate, setEventsObjStartDate] = useState(null);
  const [eventsObjEndDate, setEventsObjEndDate] = useState(null);
  const [eventsObjAttachment, setEventsObjAttachment] = useState(null);
  const [eventsObjLocation, setEventsObjLocation] = useState(null);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const TodoCollectionRef = collection(db, "user", `${user.uid}`, "todos");
    const todoQuery = query(TodoCollectionRef, where("dueDate", "!=", ""));
    const unsub = onSnapshot(todoQuery, (queryS) => {
      let todosArray = [];
      queryS.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });

    const eventsCollectionRef = collection(db, "user", `${user.uid}`, "events");
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
      const justEventDate = new Date(d2).toISOString();

      events[i].start = justEventDate;
      const epochEventTimeEnd = events[i].endDate.seconds;
      const d1 = new Date(epochEventTimeEnd * 1000);
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

  const handleDelete = async (id) => {
    const docRef = doc(db, "user", `${user.uid}`, "events", id);
    await deleteDoc(docRef);
    setShow(false);
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
                  console.log(eventObj);
                  const date = new Date(
                    eventObj.extendedProps.dueDate.toDate()
                  );
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  };
                  const new_date = date.toLocaleDateString(undefined, options);
                  setEventsObjDate(new_date);
                  setDescription1(eventObj.extendedProps.Description);
                } else {
                  setHasDueDate(false);
                  const StartDate = new Date(
                    eventObj.extendedProps.startDate.toDate()
                  );
                  const EndDate = new Date(
                    eventObj.extendedProps.endDate.toDate()
                  );
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  };
                  const new_Start_date = StartDate.toLocaleDateString(
                    undefined,
                    options
                  );
                  const new_End_date = EndDate.toLocaleDateString(
                    undefined,
                    options
                  );
                  setEventsObjStartDate(new_Start_date);
                  setEventsObjEndDate(new_End_date);
                  setDescription(eventObj.extendedProps.Description);
                  setEventsObjAttachment(eventObj.extendedProps.Attachment);
                  setEventsObjLocation(eventObj.extendedProps.Location);
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
          <DialogTitle>
            {hasDueDate ? (
              <h5 className="text-center pt-2">
                Reminder: <span className="text-primary">{eventsObjTitle}</span>
              </h5>
            ) : (
              <h5 className="text-center pt-2">
                Event: <span className="text-primary">{eventsObjTitle}</span>
              </h5>
            )}
          </DialogTitle>
          <DialogContent>
            {hasDueDate ? (
              <div>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="h6 mb-2">
                      <i>
                        <DateRangeIcon fontSize="large" color="primary" />
                      </i>
                    </div>
                    <h6 className="card-title">Due Date: {eventsObjDate}</h6>
                  </div>
                </div>
                {description1 != "" && (
                  <div className="card mt-2">
                    <div className="card-body text-center">
                      <div className="h6 mb-2">
                        <i>
                          <DescriptionIcon fontSize="large" color="primary" />
                        </i>
                      </div>
                      <h6 className="card-title">
                        Description: {description1}
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="h4 mb-2">
                      <i>
                        <DateRangeIcon fontSize="large" color="primary" />
                      </i>
                    </div>
                    <h6 className="card-title">
                      Event: {eventsObjStartDate} - {eventsObjEndDate}
                    </h6>
                  </div>
                </div>
                {/* // show the attachment */}
                {eventsObjAttachment != "" && (
                  <div className="card mt-2">
                    <div className="card-body text-center">
                      <div className="h6 mb-2">
                        <i className="mr-2">
                          <CloudDownloadOutlinedIcon
                            fontSize="large"
                            color="primary"
                          />
                        </i>

                        <h6 className="card-title m-2">
                          <a href={eventsObjAttachment} target="_blank">
                            {" "}
                            See Attachment
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                )}

                {/* // show the location */}
                {eventsObjLocation != "" && (
                  <div className="card mt-2">
                    <div className="card-body text-center">
                      <div className="h4 mb-2">
                        <i>
                          <LocationOnOutlinedIcon
                            fontSize="large"
                            color="primary"
                          />
                        </i>
                      </div>
                      <h6 className="card-title">
                        Location: {eventsObjLocation}
                      </h6>
                    </div>
                  </div>
                )}
                {description != "" && (
                  <div className="card mt-2">
                    <div className="card-body text-center">
                      <div className="h6 mb-2">
                        <i>
                          <DescriptionIcon fontSize="large" color="primary" />
                        </i>
                      </div>
                      <h6 className="card-title">Description: {description}</h6>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogActions>
              <div className="d-flex justify-content-between">
                {!hasDueDate && (
                  <div>
                    <Button onClick={() => handleDelete(eventsObjTitle)}>
                      Delete
                    </Button>
                  </div>
                )}
                <div>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </div>
              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
