import React from 'react';
import Features from '../Features/features';
import './information.css';

function Information() {
    return (
        <div className='organice__info section__margin'>
            <div className='organice__info-feature'>
                <Features title = "What is Organice" text = "We want to create an efficient medium for studying/learning/memorizing using flashcards. Providing the users with a variety of flashcard templates for different scenarios. With additional features that assists with time management, using to-do lists and calendar reminders. We want to create a website that helps students study. Using flashcards and timely reminders of to-do lists and calendars, students can achieve academic success. We have looked through different works that already exists such as Quizlet and some aspects of Notion, and have taken inspiration from them. Using Figma, we created a rough foundation of how our website would operate, along with an early rendition of our UI/UX. We plan to develop our application throughout the Spring term, and aim to deploy by April 22, 2022. "/>
            </div>
            <div className='organice__info-heading'>
                <h1 className='gradient__text'>
                    What Organice has to offer
                </h1>
                <p><Features/></p>
            </div>

            <div className='organice__info-container'>
                <Features title="Flashcards" text="This is the main feature of our website. It will be fully responsive with the core flashcard features such as creating a deck of flashcards, adding/deleting flashcards from the deck, and studying the flashcard deck. The principle feature that makes us different from the rest is the variety of different flashcards to add to the users' decks. This is to garner a larger audience of users, meaning more variety leads to different uses for the flashcards. The study component allows the user to review their material with the liberty to hide certain flashcard content to study off of, making memorization streamlined." />
                <Features title="To-Do Lists" text="The To-do feature is an add-on feature that allows for a user to plan out what they are going to be doing in the coming days or weeks. This feature includes a page where you will have all your to do shown. When adding a to do you have the option of uploading any files that are associated with that to do. This will further help with making sure you are organized and have all the files you need for a given task in one page without the hassle of going through different folders to look for your files. The user will also have the option to edit, and delete their to do. They can also choice there scaling to be able to view their to do in a one day, seven day or a month long period. With this to do feature the user is able to plan out all they have to do." />
                <Features title="Calendar" text="The calendar feature of the website will remind the user of all their upcoming tasks/assignments. The user can add reminders to each day of the week accompanied by comments and descriptions. This also includes an individual feature where it allows the user to attach/upload their desired file(s) to each reminder. The user also has the option to added an event to their calendar as well. The calendar is also integrated with the to-do component, so that all the to-do will become reminders on the calendar section of the web application. Also, all reminders set on the calendar will appear on the to do section as well." />
            </div>
        </div>
    )
}
export default Information;