import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

class Footer extends Component {
  render() {
    return (
        <div style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.Lcontainer}>
                    <Link to="/"><FlatButton labelStyle={styles.copy} label="Home" /></Link>
                    <Link to="/heroes"><FlatButton labelStyle={styles.copy} label="Heroes" /></Link>
                    <Link to="/store"><FlatButton labelStyle={styles.copy} label="Store" /></Link>
                    <Link to="/around"><FlatButton labelStyle={styles.copy} label="Around" /></Link>
                </div>
                <div style={styles.Rcontainer}>
                    <div style={styles.copy}>
                        Made by Park <i className="fa fa-copyright" aria-hidden="true"></i> 2017
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

const styles = ({
    footer: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        left: '0',
        padding: '1rem',
        backgroundColor: '#2b3d52',
        textAlign: 'center',
        minWidth: '1212px',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Lcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Rcontainer: {
        direction: 'rtl',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copy: {
        color: 'white',
    }
});

export default Footer;
