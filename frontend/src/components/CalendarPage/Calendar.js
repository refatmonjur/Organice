import React from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 

export default function Calendar() {
    return (
      <div>
      <div>
        <NewHomeNavbar />
      </div>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
      </div>
    )
  }