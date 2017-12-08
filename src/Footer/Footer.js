import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class Footer extends Component {
  render() {
    return (
        <div style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.Lcontainer}>
                    <FlatButton labelStyle={styles.copy} label="Home" />
                    <FlatButton labelStyle={styles.copy} label="Location" />
                    <FlatButton labelStyle={styles.copy} label="Privacy" />
                    <FlatButton labelStyle={styles.copy} label="Contact Us" />
                    <FlatButton labelStyle={styles.copy} label="About" />
                </div>
                <div style={styles.Rcontainer}>
                    <div style={styles.copy}>
                        Made by XXXXXXX <i className="fa fa-copyright" aria-hidden="true"></i> 2017
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
