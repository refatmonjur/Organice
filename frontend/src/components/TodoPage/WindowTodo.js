import React from 'react';
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { IconButton, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded';
import "./WindowTodo.css";


function WindowTodo() {
    return <div>
        <NewHomeNavbar />
        <div className='content_todo'>
        <div className='left_container'>
        <div className='today_button'>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                <TodayIcon color="secondary" fontSize="large" />
                Today
            </Button>

        </div>
        <div className='weekly_button'>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                <DateRangeRoundedIcon color="secondary" fontSize="large" />
                Weekly
            </Button>
        </div>
        <div className='monthly_button'>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                <CalendarViewMonthRoundedIcon color="secondary" fontSize="large" />
                monthly
            </Button>
        </div>
        </div>
        <div className='right_container'>
            asdsadasdas

        </div>
        </div>
        


    </div>;
}

export default WindowTodo;
