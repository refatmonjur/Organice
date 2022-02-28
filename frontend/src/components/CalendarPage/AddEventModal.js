import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
//import "react-datetime/css/react-datetime.css";
import "./AddEventModal.css"

export default function AddEventModal ({isOpen, onClose, onEventAdded}) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end
        })
         onClose();
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <div className="title">
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                <label>Start Date</label>    
                <Datetime value={start} onChange={date => setStart(date)} />
                </div>

                <div>
                <label>End Date</label>    
                <Datetime value={end} onChange={date => setEnd(date)} />
                </div>

                <button>Add event</button>
                 </form>
        </Modal>


    )
}