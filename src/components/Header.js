import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import logo from '../assets/logo/logo.png'
import UserBar from './UserBar'
import styles from './Header.css'
class Header extends Component {
    render() {
        return (
            <Navbar className="fixed-top bg-dark d-flex justify-content-between" expand='sm' collapseOnSelect>
                <Container>
                <Nav>
                    <Navbar.Brand>
                        <img
                            alt="React Bootstrap logo"
                            src={logo}
                            width="30"
                            height='30'
                        />
                        {/* Sheet Share */}
                    </Navbar.Brand>
                </Nav>
                <Nav className='flex-grow-1'>
                    <Form inline >
                        <FormControl type="text" placeholder="Search" className="mr-sm-1 form-control-xs" />
                        <Button variant="outline-success">?</Button>
                    </Form>
                </Nav>
                <Nav >
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <UserBar />
                    </Navbar.Collapse>
                </Nav>
                </Container>
            </Navbar>
        )

    }
}

export default Header;