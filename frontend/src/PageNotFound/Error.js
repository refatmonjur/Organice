import React from 'react'
//import pagenotfound image
import pagenotfoundImage from "./pagenotfound.png";
import NewHomeNavbar from "../components/NavbarPage/NewHomeNavbar";
//react router dom
import { BrowserRouter as Router, Route, Switch,Link,Redirect } from 'react-router-dom';
import "./Error.css";

const Error = () => {
    return (
        <Router>
            <Switch>
                <div className="Error">
                <NewHomeNavbar />

                    <h1 className='text1'>Oops..! 404 Page Not Found</h1>
                    <p className='text2'>Looks like you came to wrong page on our server</p>
                    <div className='image'>
                    <img src={pagenotfoundImage} height="500" width="500" alt="not found" />
                    </div>
                </div>
            </Switch>

        </Router>
    )
}

export default Error;