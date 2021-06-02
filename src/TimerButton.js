import React from 'react';


const TimerButton = props => (
    <div className="buttonDiv">
        <button className="btn" >Can Translate in {props.minutes}:{props.seconds}</button>
    </div>
)

export default TimerButton;