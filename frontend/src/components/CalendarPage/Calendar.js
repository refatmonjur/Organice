import React from "react";
import { useState } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import AddEventModal from "./AddEventModal";
import { useRef } from "react";
import "./Calendar.css"

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

      <div className="size">

      <div style={{position: "relative", zIndex: 0}}>

      <div className="eventbutton">
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      </div>

      <div className="thecalendar">
      <FullCalendar ref={calendarRef} 
      plugins={[ dayGridPlugin ]} 
      initialView="dayGridMonth"
      weekends={false}
  events={[
    { title: 'Senior Design Today: 11:30am', date: '2022-02-14' },
    { title: 'Senior Design Today: 11:30am', date: '2022-02-28' }
  ]}
      />
      </div>

      </div>

      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} 
      onEventAdded={event => onEventAdded(event)} />
      </div>
      </div>
    )
  }