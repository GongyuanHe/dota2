import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Heroes from './Heroes/Heroes.js';
import Home from './Home.js';
import Around from './Around/Around.js';
import Store  from  './Store/Store.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className="App" style={{minWidth: '1212px'}}>
              <Header></Header>
              <Heroes></Heroes>
              <Home></Home>
              <Around></Around>
              <Store></Store>
              <Footer></Footer>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
