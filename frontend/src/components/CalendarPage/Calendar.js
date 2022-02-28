import React from "react";
import { useState } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import AddEventModal from "./AddEventModal";
import { useRef } from "react";

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const onEventAdded = event => {
    let calendarApi = this.calendarRef.current.getApi()
    calendarApi.addEvent(event)
  }

    return (
      <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div style={{position: "relative", zIndex: 0}}>

      <div className="eventbutton">
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      </div>

      <div className="thecalendar">
      <FullCalendar ref={calendarRef} plugins={[ dayGridPlugin ]} initialView="dayGridMonth"/>
      </div>

      </div>

      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} 
      onEventAdded={event => onEventAdded(event)} />
      </div>
    )
  }