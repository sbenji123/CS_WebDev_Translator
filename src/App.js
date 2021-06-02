import React from 'react';
import './editor.css'
import Header from './Header'
import TextBox from './TextBox'
import DisplayBox from './DisplayBox'
import TranslateButton from './TranslateButton'
import TimerButton from './TimerButton'

class App extends React.Component {  
    constructor(props){
        super(props)
        this.state = {
                        languageChoices: ["Yoda","Sith","Gungan","Huttese","Mandalorian","Cheunh","Klingon","Vulcan","Dothraki","Valyrian","Pirate","Shakespeare"],
                        translated: "Translated",
                        countingDown: false,
                        countDown: null,
                        m: 0,
                        s: 0,
                    }
        this.displayTranslated = this.displayTranslated.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
        this.initiateCountdown = this.initiateCountdown.bind(this)
    }

    componentWillUnmount(){
        clearInterval(this.state.countDown)
    }

    initiateCountdown(minutesLeft, secondsLeft) {
        let seconds = secondsLeft
        let minutes = minutesLeft
        let countDown = setInterval(function(){
            seconds -= 1
            if (seconds < 0){
                seconds = 59
                minutes -= 1
                if (minutes < 0){
                    clearInterval(this.state.countDown)
                }
            }
            this.setState({m: minutes, s: seconds})
        }.bind(this), 1000)
        return countDown
    }

    displayTranslated(){
        const language = document.querySelector("#languages").value
        console.log(language)
        let text = document.querySelector("#englishText").value
        const bodyString = text.replace(/\s/g,'+')
        console.log(bodyString)
        fetch('https://api.funtranslations.com/translate/'+language,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: "text="+bodyString
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success){
                    this.setState({translated: data.contents.translated})
                } else if (data.error.code === 429){
                    alert(data.error.message)
                    if (this.state.countingDown === false){
                        const split = data.error.message.split(" ")
                        const secondsLeft = split[split.length - 2]
                        const minutesLeft=  split[split.length - 5]
                        const timer = this.initiateCountdown(minutesLeft, secondsLeft)
                        this.setState({countingDown: true, countDown: timer})
                    }
                } else{
                    throw data.error.message
                }
            })
            .catch(e => {
                alert(e)
            })
        
    }


    changeLanguage(value){
        this.setState({language: value})
    }

    render () {
        let button = !this.state.countingDown ? <TranslateButton handleClick = {this.displayTranslated} /> : <TimerButton seconds={this.state.s} minutes = {this.state.m}/>
        return (
            <div>
                <Header title="Fun Translator" />    
                <main className="main">
                    <TextBox label="English Text" name = "bingo"/>
                    <DisplayBox onChange={this.changeLanguage} label="Translated Text" text = {this.state.translated} languageChoices={this.state.languageChoices}/>
                </main>
                {button}

                
            </div>
        );
    }
}

export default App;