import React, {Component} from 'react';

import './../style/MessageList.css';

class MessageList extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      userName:"Test user",
      content: "",
      sentAt: "",
      roomId: "",
      newMessage: ""
    }

    this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  createMessage(){
    this.messageRef.push({
      username:this.state.userName,
      content:this.state.content,
      sentAt:this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId:this.props.activeRoomKey,
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newMessage) {
      return;
    }
    this.createMessage(this.state.newMessage);
    this.setState({ newMessage: "" });
  }

  handleChange(e) {
    const newName = e.target.value;
    this.setState({ newMessage: newName });
  }


  render(){

    return(
      <section>
        <div id="right">
          <p>{this.props.activeRoom}</p>
        <ul  className="messages">
          {this.state.messages
            .filter( message => message.roomId === this.props.activeRoomKey)
            .map((message, index) => (


                <li key = {index}>


                  {new
                    Date(message.sentAt).toString()}
                  {message.username}
                  {message.content}
                  </li>

            ))
          }

          </ul>
        </div>



        <div className="create-message">
          <form onSubmit= {e=> this.handleSubmit(e)} >
            <input
              type="text"
              value={this.state.newMessage}
              placeholder="message"
              onChange={e => this.handleChange(e)}
              name = "newMessage"
            />
            <input type="submit" value="Send"
            />
          </form>

        </div>
      </section>
    )
  }
}

export default MessageList;
