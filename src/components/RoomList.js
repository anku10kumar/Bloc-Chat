import React, { Component } from 'react';

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

  render (){
    return (
      <div>
      {this.state.rooms.map( room => (
        <li key={room.key}>{room.name}</li>
      ))}

      <form id= "myForm" onSubmit={(e)=>this.handleSubmit(e)}>
<label>
  Create New Room:
<input type= "text"  onChange={(e)=>this.handleChange(e)}/>
</label>
<input type = "submit" value = "+"/>
      </form>

    </div>
)
  }
}



export default RoomList
