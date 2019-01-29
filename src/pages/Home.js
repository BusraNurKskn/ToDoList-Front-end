import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Home extends Component {

  constructor(props){
    super(props);
  }

  handleLogin = () => {
    window.open("http://localhost:3000/login","_self");
  }

  handleRegister = () => {
    window.open("http://localhost:3000/register","_self");
  }

  render(){
    return(
      <div className="Home">
        <Button color="primary" onClick={this.handleLogin}>Login</Button>
        <Button color="primary" onClick={this.handleRegister}>Register</Button>
      </div>
    );
  }

}
export default Home;
