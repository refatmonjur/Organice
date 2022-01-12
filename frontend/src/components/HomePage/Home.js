import React from 'react';
import './Home.css';
import Navbar from '../NavbarPage/Navbar';
import Footer from './FooterPage/Footer';
import Header from './HeaderPage/Header';
import Information from './InformationPage/information';
import Meet from './MeetPage/meet';

// import Image from '../HomePage/homelanding.png'; 




function Home() {
    return (
        <div className='Homepage'>
            <Navbar/>
            <div className='gradient__bg'>
                <Header/>
            </div>
            <Information/>
            <Meet/>
            <Footer/>
        </div>
    )
}
export default Home;