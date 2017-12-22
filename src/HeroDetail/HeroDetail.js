import React from 'react';

class HeroDetail extends React.Component {
    constructor(props){
        super(props);
        console.log()
    }
    render() {
        return (<h1>{this.props.match.params.name}</h1>)
    }
}

export default HeroDetail;
