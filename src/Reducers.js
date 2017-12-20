import { LOG_IN, LOG_OUT } from './Actions.js'
import firebase from './Firebase.js';

var initialState = {
    isLoggedIn: 0
}
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         initialState={
//           isLoggedIn: 1
//         }
//     } else {
//         // No user is signed in.
//         initialState={
//           isLoggedIn: 0
//         }
//     }
// });


function dota2(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
        return Object.assign({}, state, {
          isLoggedIn: 1
        })
    case LOG_OUT:
        return Object.assign({}, state, {
          isLoggedIn: 0
        })
    default:
      return state
  }
}

export default dota2;
