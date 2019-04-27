import React, { Component } from 'react'
import { Button, Avatar } from 'antd'
import { signIn, signOut } from '../actions'
import { connect } from 'react-redux'
import SignIn from './SignIn';
import Register from './Register';
import { db } from './Firebase';

class UserBar extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props)
    if (this.props.fetchUser && this.props.fetchUser.uid) {
      let uid = this.props.fetchUser.uid;
      const usersRef = db.collection('users').doc(uid)

      usersRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
              console.log("USERBAR account exist")
            });
          } else {

            console.log('create new account')
            this.showModal()
          }
        });
    }
  }

  state = { visible: false }

  showModal = () => {
    if (this.state.visible !== true) {
      this.setState({
        visible: true,
      });
    }
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    let user = this.props.fetchUser;
    return (
      <div style={{ color: 'white' }}>
        {user ?
          <div>
            <Register
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            />
            <Avatar shape="square" icon="user" src={user.photoURL} />
            <Button onClick={this.props.signOut} >sign out</Button>
          </div>
          :
          <div>
            <SignIn
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            />
            <Button
              onClick={this.showModal}
              style={{ background: "#d3f261" }}>
              sign in
            </Button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { fetchUser } = state
  return { fetchUser } 
}
export default connect(mapStateToProps, { signIn, signOut })(UserBar)
