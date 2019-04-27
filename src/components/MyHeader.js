import React, { Component } from 'react'
// import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'
import logo from '../assets/logo/logo.png'
import UserBar from './UserBar'
import './Header.css'
import "antd/dist/antd.css";
import { Row, Col } from 'antd'
import SearchBar from '../SearchBar';
// const Search = Input.Search;
class MyHeader extends Component {
    render() {
        return (
            <Row gutter={48}>
                <Col span={6} >
                    <img
                        alt="React Bootstrap logo"
                        src={logo}
                        width="50"
                        height='50'
                    />
                </Col>
                <Col span={12}>
                    <SearchBar />
                    {/* <Search
                        placeholder="search"
                        onSearch={value => console.log(value)}
                        style={{ verticalAlign: 'middle' }}
                        size="large"
                    /> */}
                </Col>
                <Col span={6} align="right">
                    <UserBar />
                </Col>
            </Row>
        )

    }
}

export default MyHeader;