import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList'
import User from './components/User'

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
    this.state = {
    room : " ",
    activeRoom: '',
    user:{},
    username: ""
    }


    this.activeRoom = this.activeRoom.bind(this)
  }

  activeRoom(room){
    this.setState({activeRoom: room})
}

setUser(user) {
      this.setState({ user: user })
    }

  render() {

    return (

      <div className="App">

        <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
      <RoomList firebase={firebase} activeRoom={this.activeRoom}>
      </RoomList>

      <MessageList firebase={ firebase } activeRoomKey={this.state.activeRoom.key} userName={this.state.user ? this.state.user.displayName : "Guest"}>
       </MessageList>


     <User
       firebase = {firebase}
       user = {this.state.user}
       setUser = {function(user){
         this.setState({user:user});
       }.bind(this)}>
</User>
       </div>
    );
  }
}



export default App;
