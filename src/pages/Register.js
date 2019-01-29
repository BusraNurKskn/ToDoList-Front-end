import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      name:'',
      lastname:'',
      password:'',
    };
    console.log(this.state);
  }

  handleRegister = () => {
    const url = 'http://localhost:8080/user/register';
    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username: this.state.username,
        name: this.state.name,
        lastname: this.state.lastname,
        password: this.state.password,
      },
    }).then((response) => {

      if ( response.data === "success") {
        window.open("http://localhost:3000/login","_self")
      }

    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  render(){
    return(
      <Form style={{padding:"50px"}} >
        <FormGroup>
          <Label>Kullanıcı Adı:</Label>
          <Input type="text" id="username" placeholder="Please enter your username..." value={this.state.username} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label>İsim:</Label>
          <Input type="text" id="name" placeholder="Please enter your name..." value={this.state.name} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label>Soyisim:</Label>
          <Input type="text" id="lastname" placeholder="Please enter your lastname..." value={this.state.lastname} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label>Şifre:</Label>
          <Input type="password" id="password" placeholder="Please enter your password..." value={this.state.password} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Button onClick={this.handleRegister}>Kayıt Ol</Button>
        </FormGroup>
      </Form>
    );
  }
}
export default Register;
