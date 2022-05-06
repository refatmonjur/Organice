import React from "react";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Todo.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputBase } from "@mui/material";

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
      console.log(todo);
      setNewInput(e.target.value);
    }
  };

  const handleDate = () => {
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
        value={todo.dueDate === "" ? "" : "Date: " + handleDate()}
        className="list"
      />
      <div className="todo-options">
        <button
          className="button-complete"
          style={{
            height: 10,
            width: 10,
          }}
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>

        <button
          className="button-edit"
          style={{
            height: 10,
            width: 10,
          }}
          onClick={() => handleEdit(todo, newInput)}
        >
          <EditIcon />
        </button>

        <button
          className="button-delete"
          style={{
            height: 10,
            width: 10,
          }}
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon id="i" />
        </button>

        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            <MoreHorizOutlinedIcon color="primary" fontSize="medium" />
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="text-center text-primary">
              Details
            </DialogTitle>
            <DialogContent>
              <div className="desc1">
                <h6 className="text-warning">Due Date:</h6>
                <InputBase
                  label="Date"
                  fullWidth
                  value={todo.dueDate === "" ? "" : handleDate(todo)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="desc-container">
                <h6 className="text-warning">Description: </h6>
                <TextField
                  id="outlined-multiline-static"
                  variant="standard"
                  multiline
                  fullWidth
                  value={todo.Description}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
