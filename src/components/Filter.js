import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
export default class Filter extends Component {
    render() {
        return (
            <Nav variant="pills" defaultActiveKey="/home" className='bg-dark  p-sm-3 mt-sm-4 mb-sm-2 rounded'>
                <Nav.Item>
                    <Nav.Link eventKey="link-all" active>All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-CPE">CPE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-IT">IT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-EC">EC</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-MT">MT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-EM">EM</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}
