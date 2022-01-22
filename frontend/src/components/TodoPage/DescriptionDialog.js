import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
export default function DescriptionDialog({ setDescription }) {
  const [open, setOpen] = useState(false);
  // const [dateTime, setDateTime] = useState(new Date("2022-01-20T21:11:54"));

  const handleChange = (newValue) => {
    setDescription(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <DescriptionOutlinedIcon color="secondary" fontSize="medium" />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Description: </DialogTitle>
        <DialogContent>
          <TextField
          id="outlined-basic" label="Description" variant="outlined"
          placeholder="Ex. Work on assignment as a team"
          // value={description}
          onChange={(e) => {
            handleChange(e.target.value);
          }}>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}