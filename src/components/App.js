import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import './App.scss';
import './ShowUsers.scss';
import {users} from "../mockData";
import Header from "./Header";
import User from './User';
import UserRowTitle from "./UserRowTitle";

class App extends Component {

  constructor(props) {
    super(props);
    this._nextId = users.reduce((max, user) => Math.max(user.id, max), 0) + 1;
    this.state = {users, newUser: false}

  }


  saveUser = (user) => {
    if (user)
      this.setState((state) => ({
        users: [...state.users, {...user, roles: Array.from(user.roles.keys()), id: this._nextId++}],
        newUser: false
      }));

  };

  deleteUser = (e, id, name) => {

    this.setState((state) => ({
      users: Array.from(state.users).filter((u) => (u.id !== id))
    }), () => {
      if (!!name)
        toast.warn(`کاربر ${name} پاک شد!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
    });
  };


  render() {
    const {users, newUser} = this.state;


    return <React.Fragment>
      <Header text="مدیریت کاربران"/>
      <main role="main" className="container p-4 mt-4">
        <ToastContainer rtl={true}/>


        <button onClick={() => {
          this.setState((state) => ({
            newUser: true
          }));
        }} title="افزودن کاربر جدید"
                className="btn btn-success d-flex align-items-center"><i
          className="fa fa-plus ml-2"/><span>افزودن کاربر</span>
        </button>
        <div className="table">
        <UserRowTitle/>
        {users.length > 0 && users.map(user =>
          <User key={user.id} deleteHandler={this.deleteUser} user={user}/>
        )}</div>
        <User saveHandler={(user) => this.saveUser(user)} hideHandler={() => this.setState({newUser: false})}
              modal={!!newUser} new={true}/>
      </main>
    </React.Fragment>;
  }
}

export default App;
