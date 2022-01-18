import React from "react";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Todo.css";

export default function EachTodo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newInput, setNewInput] = useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewInput(todo.title);
    } else {
      todo.title = "";
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
      <div className="todo-options">
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>

        <button
          className="button-edit"
          onClick={() => handleEdit(todo, newInput)}
        >
          <EditIcon />
        </button>

        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
