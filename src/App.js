import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import RoomList from './components/RoomList';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCScGH0vIHRx0l2-9YHvs50qvu_jcpqBiU",
   authDomain: "chitchatty-1b0c1.firebaseapp.com",
   databaseURL: "https://chitchatty-1b0c1.firebaseio.com",
   projectId: "chitchatty-1b0c1",
   storageBucket: "chitchatty-1b0c1.appspot.com",
   messagingSenderId: "789565352032"
 };
 firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="App">
         <RoomList firebase={firebase} />
       </div>
    );
  }
}



export default App;
