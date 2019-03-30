import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import styles from './SidePanel.css';
import Clock from './Clock.js'

export default class SidePanel extends Component {
    render() {
        return (
            <div className='sidenav'>
                <Nav defaultActiveKey="/home" className="flex-column align-items-center pt-sm-4 mt-sm-4 rounded bg-dark">
                    <Nav.Link href="/home" >Home</Nav.Link>
                    <Nav.Link href="/home">My Course</Nav.Link>
                    <Nav.Link href="/home">Share</Nav.Link>
                    <Clock size='150' timeFormat="24hour" hourFormat="standard" />
                </Nav>

            </div>
        )
    }
}
