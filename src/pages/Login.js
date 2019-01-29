import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      listname : '',
      isLoggedin : false,
      list:[],
      itemname: '',
      itemdescription: '',
      itemdeadline: '',
      itemdependency:'',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  handleLogin = () => {
    const url = "http://localhost:8080/user/login";

    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username: this.state.username,
        password: this.state.password,
      },
    }).then((response) => {

      console.log(response);
      if (response.data === "success") {

        this.setState({isLoggedin:true},()=>{
          this.getAllItems();
        });

      }

    });

  }

  createList = () => {
    const url = "http://localhost:8080/todolist/create";
    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username: this.state.username,
        name: this.state.listname,
      },
    }).then((response) => {
      if(response.data === "success") {
        this.getAllItems();
      }
    });

  }

  getAllItems = () => {
    const url = "http://localhost:8080/todolist/getall";
    axios({
      url:url,
      method:"get",
      headers:{
        'Content-Type':'application/json',
      },
      params:{
        username: this.state.username
      },
    })
    .then((response) =>{
      console.log(response);
      this.setState({list:response.data.toDoLists})
    });
  }

  addItem = (event) => {
    const url = "http://localhost:8080/todoitem/add";
    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username:this.state.username,
        listid:event.target.id,
        name:this.state.itemname,
        description:this.state.itemdescription,
        deadline:this.state.itemdeadline,
        status:"notfinished",
        dependency: this.state.itemdependency
      },
    }).then((response) => {
      if(response.data === "success"){
        this.getAllItems();
        this.setState({
          itemname: '',
          itemdescription: '',
          itemdeadline: '',
          itemdependency: '',
        });
      }
    })
  }

  deleteList = (event) => {
    const url = "http://localhost:8080/todolist/del";
    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username:this.state.username,
        listid:event.target.id,
      },
    }).then((response) => {
      if(response.data === "success") {
        this.getAllItems();
      }
    });

  }

  deleteItem = (event) => {
    const url = "http://localhost:8080/todoitem/del";
    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username:this.state.username,
        itemid:event.target.id,
      },
    }).then((response) => {
      if(response.data === "success") {
        this.getAllItems();
      }
    });

  }

  finishItem = (event) => {
    const url = "http://localhost:8080/todoitem/finish";
    axios({
      url:url,
      method:"post",
      headers:{
        'Content-Type':'application/json',
      },
      data:{
        username:this.state.username,
        itemid:event.target.id,
      },
    }).then((response) => {
      if(response.data === "success") {
        this.getAllItems();
      }
    });

  }

  render(){
    return(
      <div>
        { !this.state.isLoggedin && (
          <Form style={{padding:"50px"}} >
            <FormGroup>
              <Label>Kullanıcı Adı:</Label>
              <Input type="text" id="username" placeholder="Please enter your username..." value={this.state.username} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label>Şifre:</Label>
              <Input type="password" id="password" placeholder="Please enter your password..." value={this.state.password} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Button onClick={this.handleLogin}>Login</Button>
            </FormGroup>
          </Form>
        )}

        { this.state.isLoggedin && (
          <div style={{textAlign:'center'}}>
            <h1>To do lists of {this.state.username}</h1>
            {this.state.list.map((list, i) => {
              return(
                <div style={{paddingTop:"10px",}}>
                  <div >
                    <h3 style={{color:'coral'}}>{list.name}</h3>
                    <Button id={list.id} onClick={this.deleteList}>Delete</Button>
                  </div>
                  {list.toDoItemSet.map((item,k) => {
                    return(
                      <li style={{marginLeft:"15px", paddingTop:'25px'}}>
                        <span>{item.id} - </span>
                        <span>{item.name} ,</span>
                        <span>{item.description} ,</span>
                        <span>{item.deadline} </span>
                        <Button id={item.id} onClick={this.deleteItem} style={{background:'none', color:'black'}}> <i class="fa fa-trash"></i> Delete Item</Button>
                        {item.status==="finished" && <Button id={item.id} onClick={this.finishItem} style={{background:'#7AFF81', color:'white'}}><i class="fa fa-check"></i> Finish Item</Button>}
                        {item.status==="notfinished" && <Button id={item.id} onClick={this.finishItem}><i class="fa fa-check"></i> Finish Item</Button>}
                      </li>
                    );
                  })}
                  <div style={{display:"inline-block", paddingTop:'15px'}}>
                    <Input type="text" id="itemname" placeholder="Name..." value={this.state.itemname} onChange={this.handleChange}/>
                    <Input type="text" id="itemdescription" placeholder="Description..." value={this.state.itemdescription} onChange={this.handleChange}/>
                    <Input type="text" id="itemdeadline" placeholder="Deadline..." value={this.state.itemdeadline} onChange={this.handleChange}/>
                    <Input type="text" id="itemdependency" placeholder="Enter Dependency Id..." value={this.state.itemdependency} onChange={this.handleChange}/>
                    <div>
                      <Button id={list.id} onClick={this.addItem}>Add New Item To List</Button>
                    </div>

                  </div>
                </div>
              );
            })}

                <div style={{paddingTop:"20px"}}>
                  <div style={{ paddingRight:"300px", paddingLeft:"300px"}} >
                    <Input type="text" id="listname" placeholder="Please enter your list name..." value={this.state.listname} onChange={this.handleChange}/>
                  </div>
                  <div style={{paddingTop:"15px",}}>
                    <Button onClick={this.createList}>Create New List</Button>
                  </div>
                </div>

              </div>
        )}

      </div>
    );
  }
}
export default Login;
