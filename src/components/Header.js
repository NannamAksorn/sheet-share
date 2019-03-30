import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import logo from '../assets/logo/logo.png'
import UserBar from './UserBar'

class Header extends Component {
    render() {
        return (
            <Navbar className="bg-dark justify-content-between mt-sm-4">
                <Container>
                    <Nav>
                        <Navbar.Brand>
                            <img
                                alt="React Bootstrap logo"
                                src={logo}
                                width="50"
                                height="50"
                                className="d-inline-block"
                        />
                        {/* Sheet Share */}
                </Navbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">?</Button>
                    </Form>
                </Nav>
                <UserBar />
                </Container>
            </Navbar>
        )

    }
}

export default Header;