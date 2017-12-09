import React, { Component } from 'react';

class Home extends Component {

    render () {
      return(
          <div style={styles.container}>
              Home
          </div>
      )
    }
}
const styles = ({
    container: {
        fontSize: '250%',
        fontFamily: 'times, Times New Roman, times-roman, georgia, serif',
        color: '#444',
        margin: '0',
        padding: '0px 0px 6px 0px',
        lineHeight: '44px',
        letterSpacing: '-2px',
        fontWeight: 'bold',
    }
})

export default Home;
