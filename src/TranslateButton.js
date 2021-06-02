import React from 'react';


const TranslateButton = props => (
    <div className="buttonDiv">
        <button onClick = {props.handleClick} className="btn" >Translate</button>
    </div>
)

export default TranslateButton;