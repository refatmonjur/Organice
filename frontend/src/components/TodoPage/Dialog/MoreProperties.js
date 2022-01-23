import React from 'react';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
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


function MoreProperties({ setDescription, dateTime, setDateTime }) {

    const [open, setOpen] = useState(false);
    // const [dateTime, setDateTime] = useState(new Date("2022-01-20T21:11:54"));
  
    const handleChange = (newValue) => {
      setDateTime(newValue);
    };
    const handleChange2 = (newValue) => {
        setDescription(newValue);
      };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return <div>
      <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddCircleOutlinedIcon color="secondary" fontSize="medium" />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>choose due date and time</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date Time picker"
              value={dateTime}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          
          <TextField
          id="outlined-basic" label="Description" variant="outlined"
          placeholder="Ex. Work on assignment as a team"
          // value={description}
          onChange={(e) => {
            handleChange2(e.target.value);
          }}>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
  </div>;
}

export default MoreProperties;
