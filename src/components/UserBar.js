import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
export default class UserBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: "",
    }
  }
  render() {
    let id = this.state.id;
    return (
      <div>
        {id ? <h4>ID: {id}</h4> :
          <div className='justify-content-center'>
            <Button variant="success" className='mr-sm-2'>Login</Button>
            <Button variant="danger">Register</Button>
          </div>
        }
      </div>
    )
  }
}
