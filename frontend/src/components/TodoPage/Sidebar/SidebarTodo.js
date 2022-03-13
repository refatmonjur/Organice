import React, { Component } from "react";
import './SidebarTodo.css';
import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { IconContext } from 'react-icons';

class SidebarTodo extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <p> Todo List </p>
                        </li>
                        <li className="menu_btn">
                            <Link to="todo">
                                <BsIcons.BsCalendarCheck 
                                    style={{marginRight: 10}}
                                />
                                    Listing
                            </Link>
                        </li>
                        <li className="menu_btn">
                            <Link to="/WindowTodo">
                                <BsIcons.BsCalendarEvent 
                                    style={{marginRight: 10}}
                                />
                                    Today
                            </Link>
                        </li>
                        <li className="menu_btn">
                            <Link to="/WeeklyTodo">
                                <BsIcons.BsCalendarRange 
                                    style={{marginRight: 10}}
                                />
                                    Weekly
                            </Link>
                        </li>

                        <li className="menu_btn">
                            <Link to="/MonthlyTodo">
                                <BsIcons.BsCalendar3 
                                    style={{marginRight: 10}}
                                />
                                
                                    Monthly
                                
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SidebarTodo;
