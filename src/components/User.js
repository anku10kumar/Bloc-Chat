import React, { Component } from 'react';

class User extends Component{
  constructor(props){
    super(props)
}

  signInWithPopup=()=>{
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut = ()=>{
this.props.firebase.auth().signOut();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render(){

    return(

      <div className = "buttons">
        <button onClick={() => this.signInWithPopup()}>Sign-In</button>
      <button onClick={() => this.signOut()}>Sign-Out</button>

    <div>

      <p className ="UserName">
        Hello, {this.props.user ? this.props.user.DisplayName : "Guest"}!
      </p>

    </div>

  </div>

)

}
}

export default User;
