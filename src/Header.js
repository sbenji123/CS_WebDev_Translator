import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {title: props.title}
    }
  
    render () {
        return (
            <header>
                <h1>{this.state.title}</h1>
            </header>
        );
    }
}

export default Header;