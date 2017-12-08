import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import logo from './logo.png';
import { login, logout } from '../Actions.js';
import firebase from '../Firebase.js';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: () => dispatch(login()),
        logout: () => dispatch(logout())
    }
}

class HeaderComponent extends Component {
  constructor(props) {
     super(props);
     this.state = {
        loginText: "Log In",
        photoURL: "",
     }
  }

  handleLogin = () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      if (this.props.isLoggedIn) {
          firebase.auth().signOut().then(() => {
             this.props.logout();
             this.setState({
                loginText: "Log In",
                photoURL: "",
             });
          });
      }else{
          firebase.auth().signInWithPopup(provider).then((result)=>{
              this.props.login();
              this.setState({
                 loginText: "Log Out",
                 photoURL: result.user.photoURL,
              });
          });
      }
  }

  render() {
    return (
      <div className="Header" style={styles.container}>
          <div style={styles.Lcontainer}>
              <img src={logo} alt = "logo"style={{width:'167px',height:'33px',marginLeft: '20px'}}></img>
              <div style={styles.search}>
                  <div style={{width: '400px'}}>
                      <TextField hintText="Search Here" fullWidth={true}/>
                  </div>
                  <i className="fa fa-search fa-2x" aria-hidden="true"></i>
              </div>
          </div>
          <div className="Lcontainer" style={styles.Rcontainer}>
              <a id = "login" style={styles.login} onClick={this.handleLogin}>{this.state.loginText}</a>
              <div>
                  {
                      this.state.photoURL ? (
                          <img src={this.state.photoURL} style={{width: '30px', height: '30px'}} alt = 'selfi'></img>
                      ) : (
                          <div></div>
                      )
                  }
              </div>
              <FlatButton label="About" />
              <FlatButton label="Contact Us" />
              <FlatButton label="Location" />
              <FlatButton label="Home" />
          </div>
      </div>
    );
  }
}
const styles = ({
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '10px 0px 5px #888888'
    },
    search: {
        display: 'flex',
        paddingLeft: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Lcontainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Rcontainer:{
        direction: 'rtl',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        color: '#1e3651',
        width: '120px',
        display: 'flex',
        fontSize: '1.5em',
        height: '40px',
        borderColor: '#1e3651',
        borderRadius: '34px',
        borderWidth: '2px',
        borderStyle: 'solid',
        paddingLeft: '15px',
        paddingRight: '15px',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px'
    },
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
export default Header;
