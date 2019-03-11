import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName :'',
      name : ''
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e){
    this.setState =({newRoomName:e.target.value});
  }

  createNewRoom(e){
    e.preventDefault();
    if (!this.state.name) return
    const newRoomName = this.state.name;
    this.roomsRef.push({name:newRoomName});
    this.setState=({name: ""});
  }




  render (){
    return (
      <div>
        {this.state.rooms.map( room => (
          <li key={room.key}>{room.name}</li>
        ))}

        <form className="submitForm" onSubmit={this.createNewRoom.bind(this)}>

          <input
            id="submitRoomForm"
            name = "name"
            ref={nroom => this.name = nroom}
            onChange={this.handleChange.bind(this)}
            value={this.state.name}
            placeholder="Enter new Room"
            type="text" />
        </form>


      </div>
    )
  }
}



export default RoomList
