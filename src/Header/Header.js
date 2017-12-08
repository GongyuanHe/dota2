import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import logo from './logo.png'


class Header extends Component {
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
              <a id = "login" style={styles.login}>Log In / Sign Up</a>
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
export default Header;
