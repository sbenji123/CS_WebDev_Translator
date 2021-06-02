import React from 'react';


const TextBox = props => (
    <div className = "boxWrapper alignRight" id = {props.id}>
        <label className = "labelWrapper">
            <p id="englishTitle">{props.label}</p>
            <textarea id="englishText" className="textBox"/>
        </label>
    </div>
)

export default TextBox;