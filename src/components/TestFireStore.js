import React, { Component } from 'react'
import firebase from './Firebase'
export default class TestFireStore extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            sid: "",
            users: [],
        };
    }
    componentDidMount() {
        firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          const users = [];
  
          querySnapshot.forEach(function(doc) {
            users.push({
              sid: doc.data().sid,
              username: doc.data().username,
            });
          });
  
          this.setState({ users });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    }
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.collection('users').add({
            username:this.state.username,
            sid:this.state.sid
        });
        this.setState({
            username:'',
            sid:''
        });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.addUser}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        onChange={this.updateInput}
                        value={this.state.username}
                    />
                    <input
                        type='number'
                        name='sid'
                        placeholder='Student ID'
                        onChange={this.updateInput}
                        value={this.state.sid}
                    />
                    <button type="submit">submit</button>
                </form>
                <div>
                    {this.state.users.map(user => {
                        return (
                            <p>
                                USERNAME: {user.username},
                                SID: {user.sid},
                            </p>
                        );
                    })}
                </div>
            </div>
        );
    }
}
