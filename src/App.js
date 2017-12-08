import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Heroes from './Heroes/Heroes.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
              <Header></Header>
              <Heroes></Heroes>
              <Footer></Footer>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
