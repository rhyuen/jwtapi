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
        <div>HOME</div>
        <div>Search</div>
        <div>Profile</div>
      </div>
    )
  }
}

export default TopBar;
