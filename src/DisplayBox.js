import React from 'react';

const LanguageDropdown = props => (
    <form>
        <label >Choose a Language</label>
        <select id="languages" name="languages">
            {
            props.languageChoices.map((language) => {
                return (<option key ={language.toLowerCase()} value = {language.toLowerCase()}>{language}</option>)
            })
            }
        </select>
    </form>
)


const DisplayBox = props => (
    <div className = "boxWrapper alignLeft" id = {props.id}>
        <label className = "labelWrapper">
            <LanguageDropdown languageChoices={props.languageChoices}/>
            <div className = "displayBox">
                {props.text}
            </div>
            {/* <textarea  name ={props.name} className="displayBox"/> */}
        </label>

    </div>
)

export default DisplayBox;