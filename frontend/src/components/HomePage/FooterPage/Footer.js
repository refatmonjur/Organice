import React from 'react';
import './footer.css';

function Footer() {
    return (
        <div className="organice__footer ">
            <div className="organice__footer-heading">
                <h1 className="gradient__text">This website is created for Senior Project 1 and 2</h1>
            </div>

            <div className="organice__footer-links">
                <div className="organice__footer-links_div">
                    <h4>Links</h4>
                    <p>Social Media</p>
                    <p>Contact</p>
                </div>
                <div className="organice__footer-links_div">
                    <h4>Company</h4>
                    <p>Terms & Conditions </p>
                    <p>Privacy Policy</p>
                    <p>Contact</p>
                </div>
            </div>

            <div className="organice__footer-copyright">
                <p>@2022 ORGANICE. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;