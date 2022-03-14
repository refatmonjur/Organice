import React from "react";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Todo.css";
import ShowDesc from "./ShowDesc";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
export default function EachTodo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newInput, setNewInput] = useState(todo.title);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      
      setNewInput(todo.title);
    } else {
      todo.title = "";
      console.log(todo)
      setNewInput(e.target.value);
    }
  };
  return (
    <div className="todo" style={{}}>
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={todo.title === "" ? newInput : todo.title}
        className="list"
        onChange={handleChange}
      />
      <input
        type="text"
        readOnly
        value={todo.dueDate === "" ? "" : "⏰ " + todo.dueDate.toDate()}
        className="list"
      />

      <div className="todo-options">
        {/* this is the checked button  */}
        {/* <MoreOptions/> */}
        <button
          className="button-complete"
          style={{
            height: 10,
            width: 10
          }}
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>

        {/* this is the Edit button  */}
        <button
          className="button-edit"
          style={{
            height: 10,
            width: 10
          }}
          onClick={() => handleEdit(todo, newInput)}
        >
          <EditIcon />
        </button>
        {/* this is the delete button  */}
        <button 
          className="button-delete"
          style={{
            height: 10,
            width: 10
          }}
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon id="i" />
        </button>

        {/* this is the more info button  */}
        <div>
          {/* <ShowDesc Todo={todo} /> */}
          <Button variant="outlined" onClick={handleClickOpen}>
            <MoreHorizOutlinedIcon color="secondary" fontSize="medium" />
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Description</DialogTitle>
            <DialogContent>
              {/* show the due date */}
              <input
                type="text"
                readOnly
                value={todo.dueDate === "" ? "" : "⏰ " + todo.dueDate.toDate()}
                className="list"
              />
                <br/>
              {/* this is the description */}
              <input
                type="text"
                readOnly
                value={todo.Description}
                className="list"
              />

              {/* show file that is added */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* <button className="button-moreInfo" onClick={() => handleInfo(todo.id)}>
          <MoreHorizOutlinedIcon id="i" />
        </button> */}
      </div>
    </div>
  );
}
