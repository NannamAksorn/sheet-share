import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import logo from '../assets/logo/logo.png'
export default class SheetCard extends Component {
    render() {
        return (
            <Card>
                <Card.Text>ITS100 <small className="text-muted">- Computer Architecture</small></Card.Text>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>HW1</Card.Title>
                    
                    <Card.Link href="#">
                        <small className="text-muted">Nannam Aksorn</small>
                    </Card.Link>
                    <Card.Text>
                        <small className="text-muted">500 view - 2 days ago</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
