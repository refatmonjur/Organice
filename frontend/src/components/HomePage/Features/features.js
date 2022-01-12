import React from 'react';
import './features.css';

function Features({ title, text }) {
    return (
        <div className="organice__features-container__feature">
            <div className="organice__features-container__feature-title">
                <div />
                <h1>{title}</h1>
            </div>
            <div className="organice__features-container_feature-text">
                <p>{text}</p>
            </div>
        </div>
    )
}
export default Features;