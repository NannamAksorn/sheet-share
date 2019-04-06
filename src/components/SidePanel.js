import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import styles from './SidePanel.css';
import Clock from './Clock.js'
import { Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class SidePanel extends Component {
    render() {
        return (
            <Menu
                defaultSelectedKeys={['home']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="home">
                    <Icon type="home" />
                    <span>Home</span>
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="myCourse">
                    <Icon type='book' />
                    <span> My Course</span>
                    <Link to="/test" />

                </Menu.Item>
                <Menu.Item key="upload">
                    <Icon type='cloud-upload' />
                    <span>Upload</span>
                    <Link to='/upload' />
                </Menu.Item>

                <Clock size='150' timeFormat="24hour" hourFormat="standard" />
            </Menu>
        )
    }
}
