import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

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
          <Router>
              <div className="App" style={{minWidth: '1212px'}}>
                  <Header></Header>

                  <Route exact path="/" component={Home}/>
                  <Route path="/heroes" component={Heroes}/>
                  <Route path="/store" component={Store}/>
                  <Route path="/around" component={Around}/>

                  <Footer></Footer>
              </div>
          </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
