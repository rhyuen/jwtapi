import React, {Component} from "react";

class LoginForm extends Component{
  constructor(props){
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  handleFirstNameChange(event){
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastNameChange(event){
    this.setState({
      lastName: event.target.value
    });
  }

  render(){
    return (
      <div>
        <input type = "text" value = {this.state.firstName} onChange = {this.handleFirstNameChange}/>
        <br/>
        <input type = "text" value = {this.state.lastName} onChange = {this.handleLastNameChange}/>
        <br/>
        <input type = "button" onSubmit = {this.handleSubmit} value = "Login"/>
        <hr/>
      </div>
    )
  }
}

export default LoginForm;
