import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

import logo from '../assets/chat_logo.png'
import firebase from '../Firebase.js';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}

class ChatComponent extends Component {
    constructor () {
        super();

        this.state = {
            usr: ' ',
            data: [],
        }
    }
    scrollToBottom = () => {
        if(this.messagesEnd){
            this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
        }
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.isLoggedIn){
            return true;
        }else{
            return true;
        }
    }
    async componentDidMount () {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                this.setState({
                    usr: user.email
                });
            }
        });
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
            setTimeout(this.scrollToBottom,0);
        });
        setTimeout(this.scrollToBottom,0);
    }
    handleClick = () => {
        let name = this.state.usr;
        let msg = this.state.msg;
        this.setState({
            msg: ''
        });
        let ref = firebase.database().ref().child("messages");
        console.log(name);
        ref.push({
            name: name,
            msg: msg,
            time: firebase.database.ServerValue.TIMESTAMP
        });
    }
    render () {
        return (
            <div style={styles.container}>
                <div  style={styles.title}>
                    <img src={logo} alt="avatar" style={styles.logo}/>
                    <h1 style={{fontWeight: 'bold'}}>Dota2 Real-time Chat Room</h1>
                </div> 
                <div style={styles.chatMsg} ref={(el) => { this.messagesEnd = el; }}>
                    {this.props.isLoggedIn ? 
                    <ul style={{listStyleType: 'none'}}>
                        {this.state.data.map( ( obj, i) => {
                            return (!(obj.name === this.state.usr) ?
                                        <li key={i} style={styles.messages}>
                                            <div  style={{marginBottom: '15px'}}>
                                                <i className="fa fa-circle" style={{color: '#94C2ED'}}></i>
                                                <span  >{obj.name}</span>&nbsp; &nbsp; 
                                                <span  >{obj.time}</span> 
                                            </div>
                                            <div style={styles.otherArrowUp}></div>
                                            <div style={styles.other}>
                                                {obj.msg}
                                            </div> 
                                        </li>
                                        :
                                        <li key={i} style={styles.messages}>
                                            <div  style={{marginBottom: '15px',alignSelf: 'flex-end'}}>
                                                <span  >{obj.time}</span> &nbsp; &nbsp;
                                                <span  >{obj.name}</span> <i className="fa fa-circle" style={{color: '#86BB71'}}></i>
                                            </div>
                                            <div style={styles.myArrowUp}></div>
                                            <div style={styles.my}>
                                                {obj.msg}
                                            </div>
                                        </li>)
                        })}
                    </ul>
                    : 
                    <h1>Membership only!</h1>
                    }

                </div>
                <div style={{padding: '30px'}}>
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
                        <RaisedButton label="Send" primary={true} style={{margin: '12px'}} 
                            onClick={this.handleClick } disabled={ !this.state.msg || !this.props.isLoggedIn}/>
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
    messages: {
        display: 'flex',
        flexDirection: 'column',
        wordWrap:'break-word',
    },
    myArrowUp: {
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #86BB71',
        alignSelf: 'flex-end',
        marginRight: '20px'
    },
    otherArrowUp: {
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #94C2ED',
        alignSelf: 'flex-start',
        marginLeft: '20px'
    },
    my: {
        alignSelf: 'flex-end',
        maxWidth: '80%',
        backgroundColor: '#86BB71',
        padding: '18px 20px',
        fontSize: '16px',
        borderRadius: '7px',
        marginBottom: '30px',
        color: 'white',
        marginRight: '5px'
    },
    other: {
        alignSelf: 'flex-start',
        maxWidth: '80%',
        backgroundColor: '#94C2ED',
        padding: '18px 20px',
        fontSize: '16px',
        borderRadius: '7px',
        marginBottom: '30px',
        color: 'white',
        marginLeft: '5px'
    },
    send: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
})
const Chat = connect(mapStateToProps,null,null,{  pure: false })(ChatComponent);
export default Chat;