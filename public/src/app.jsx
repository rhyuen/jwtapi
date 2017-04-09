import React, {Component} from "react";
import TopBar from "./shared/topbar.jsx";
import LoginForm from "./LoginForm.jsx";

class App extends Component{
  constructor(props){
    this.state = {

    };
  }

  render(){
    return(
      <div className = "">
        <TopBar/>
        <div className = "">
          <LoginForm/>
        </div>
      </div>
    );
  }
}


export default App;
