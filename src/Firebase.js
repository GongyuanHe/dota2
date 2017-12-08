import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDhSkeyPzWMIellc4UJHsL_gaCIlXKuc84",
    authDomain: "absentee-3cd83.firebaseapp.com",
    databaseURL: "https://absentee-3cd83.firebaseio.com",
    projectId: "absentee-3cd83",
    storageBucket: "absentee-3cd83.appspot.com",
    messagingSenderId: "110769607749"
};
firebase.initializeApp(config);
export default firebase;
