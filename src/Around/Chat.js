import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './Chat.css';
import logo from '../assets/chat_logo.png'
import firebase from '../Firebase.js';

class Chat extends Component {
    constructor () {
        super();
        this.state = {
            usr: 'Park',
            data: [],
        }
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }
    async componentDidMount () {
        let ref = firebase.database().ref().child("messages");
        let data = [];
        let time, dataPiece;

        await ref.on("child_added", snapshot => {
            dataPiece = snapshot.val();
            time = new Date(dataPiece.time.toString().substring(0,10)*1000).toString().split(' ').splice(0,5).toString();
            dataPiece.time = time;
            data.push(dataPiece);
            this.setState({
                data: data
            });
            this.scrollToBottom();
        });
    }
    handleClick = () => {
        let name = this.state.usr;
        let msg = this.state.msg;
        let ref = firebase.database().ref().child("messages");
        ref.push({
            name: name,
            msg: msg,
            time: firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({
            msg: ''
        });
        setTimeout(this.scrollToBottom,0);
    }
    render () {
        return (
            <div style={styles.container}>
                <div className="clearfix" style={styles.title}>
                    <img src={logo} alt="avatar" style={styles.logo}/>
                    <h1 style={{fontWeight: 'bold'}}>Dota2 Real-time Chat Room</h1>
                </div> 
                <div style={styles.chatMsg} ref={(el) => { this.messagesEnd = el; }}>
                    <ul style={{listStyleType: 'none'}}>
                        {this.state.data.map( ( obj, i) => {
                            return (!(obj.name === this.state.usr) ?
                                        <li key={i} className="clearfix">
                                            <div className="align-right" style={{marginBottom: '15px'}}>
                                                <span className="message-data-time" >{obj.time}</span> &nbsp; &nbsp;
                                                <span className="message-data-name" >{obj.name}</span> <i className="fa fa-circle me"></i>
                                            </div>
                                            <div className="message other-message float-right">
                                                {obj.msg}
                                            </div> 
                                        </li>
                                        :
                                        <li key={i} className="clearfix">
                                            <div  style={{marginBottom: '15px'}}>
                                                <span className="message-data-name"><i className="fa fa-circle online"></i>{obj.name}</span>
                                                <span className="message-data-time">{obj.time}</span>
                                            </div>
                                            <div className="message my-message">
                                                {obj.msg}
                                            </div>
                                        </li>)
                        })}
                    </ul>
                </div>
                <div className="chat-message clearfix ">
                    <TextField
                        hintText="Type Here"
                        floatingLabelText="Type Message"
                        multiLine={true}
                        rows={3}
                        fullWidth={true}
                        value={this.state.msg}
                        onChange = { (e) => this.setState({msg: e.target.value})}
                    />
                    <div style={styles.send}>
                        <RaisedButton label="Send" primary={true} style={{margin: '12px'}} onClick={this.handleClick}/>
                    </div>
                </div> 
            </div>
        )
    }
};

const styles = ({
    container:{
        width: '80%',
        background: '#F2F5F8',
        borderRadius: '5px',
        color: '#434651'      
    },
    logo: {
        width: '100px',
        borderRadius: '50%'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '2px solid white'
    },
    chatMsg: {
        padding: '30px 30px 20px',
        borderBottom: '2px solid white',
        overflowY: 'scroll',
        height: '575px'
    },
    send: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
})

export default Chat;