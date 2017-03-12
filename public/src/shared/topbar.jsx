import React, {Component} from "react";

class TopBar extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <div><a href = "/">HOME</a></div>
        <div><a href = "/browse">Search</a></div>
        <div><a href = "/browse">Browse</a></div>
        <div><a href = "/user">Profile</a></div>
        <div><a href = "/register">Signup</a></div>
        <div><a href = "/logout">Logout</a></div>
      </div>
    );
  }
}

export default TopBar;
