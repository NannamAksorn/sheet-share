import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { setProgram } from '../actions'
class Filter extends Component {
    handleSelect(eventKey) {
        this.props.setProgram(eventKey)
    }
    render() {
        return (
            <Nav variant="pills"
             defaultActiveKey="/home"
             onSelect={k => this.handleSelect(k)}
             className='bg-dark  p-sm-3 mt-sm-4 mb-sm-2 rounded'>
                <Nav.Item>
                    <Nav.Link eventKey="CPE">CPE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="IT">IT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="EC">EC</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="MT">MT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="EM">EM</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default connect(null, { setProgram })(Filter)