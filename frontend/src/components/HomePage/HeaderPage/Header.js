import React from 'react';
import { Button } from '@mui/material';
import image from './POGGIES.png';
import './header.css';

function Header() {
    return (
        <div className='organice__header section__padding' id='home'>
            <div className='organice__header-content'>
                <h1 className='gradient__text'>
                    Welcome to Organice
                </h1>
                <p>
                    Given a semester long period, we will be creating a flashcard-based website that will aid students of all ages. Studying is a key component in order to succeed in academic life, and flashcards are an effective way to memorize information for upcoming exams and tests. There will be additional components such as a calendar and to-do list for the user to further organize their academic journey.
                </p>
                <div className='organice__header-content__input'>
                    <Button style={{ textTransform: 'none' }} variant='contained' type='button'>Get Started</Button>
                </div>
            </div>


            <div className='organice__header-image'>
                <img src={image} />
            </div>

        </div>
    )
}
export default Header;