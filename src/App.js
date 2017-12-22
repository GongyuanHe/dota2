import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import Heroes from './Heroes/Heroes.js';
import Home from './Home.js';
import Around from './Around/Around.js';
import HeroDetail from './HeroDetail/HeroDetail.js';
import Store  from  './Store/Store.js';
import { login, logout } from './Actions.js';
import firebase from './Firebase.js';

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
class AppComponent extends Component {
  componentWillMount() {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.props.login();
          } else {
              // No user is signed in.
              this.props.logout();
          }
      });
  }
  render() {
    return (
      <MuiThemeProvider>
          <Router>
              <div className="App" style={{minWidth: '1212px'}}>
                  <Header></Header>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/heroes" component={Heroes} />
                  <Route path="/heroes/:name" component={HeroDetail}/>
                  <Route path="/store" component={Store}/>
                  <Route path="/around" component={Around}/>
                  <Footer></Footer>
              </div>
          </Router>
      </MuiThemeProvider>
    );
  }
}
const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
