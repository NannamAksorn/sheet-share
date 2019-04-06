import React, { Component } from 'react'
// import Button from 'react-bootstrap/Button'
import { Button, Avatar, Row, Col } from 'antd'
export default class UserBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: "5922782974",
    }
  }
  render() {
    let id = this.state.id;
    return (
      <div style={{ color: 'white' }}>
        {id ?
          <div>
                {/* <span>{id}</span> */}
                <Avatar shape="square" icon="user" />
          </div>
          :
          <div>
            <Button style={{ background: "#d3f261" }}>sign in</Button>
          </div>
        }
      </div>
    )
  }
}
