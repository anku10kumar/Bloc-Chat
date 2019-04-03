import React, { Component } from 'react';

import './../style/RoomList.css';

import './../style/RoomList.css';



class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
newRoomName : ""
}

    this.roomsRef = this.props.firebase.database().ref('rooms');

}

  createNewRoom(newRoomName){
     this.roomsRef.push({name:newRoomName});
     this.setState=({newRoomName: ""});

   }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }
handleChange(e){
this.setState({newRoomName:e.target.value});
}

handleSubmit(e){
e.preventDefault();
this.createNewRoom(this.state.newRoomName);
var form = document.getElementById("myForm");
form.reset();
}

selectRoom(room) {
   this.props.activeRoom(room);
 }



  render (){
    return (
      <div id='left'>
        <h1>
      {this.state.rooms.map( room => (
        <li key={room.key} onClick={() => this.selectRoom(room)}>{room.name} </li>
      ))}
    </h1>


      <form id= "myForm" onSubmit={(e)=>this.handleSubmit(e)}>
<label>
  Create New Room:
<input type= "text"  onChange={(e)=>this.handleChange(e)}/>
</label>
<input type = "submit" value = "+"/>
      </form>


       <h3>{this.state.activeRoom}</h3>


    </div>
)
  }
}




export default RoomList
