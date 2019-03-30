import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import SheetsCards from './components/SheetCards'
import SidePanel from './components/SidePanel'
import Filter from './components/Filter'
import { Container, Row, Col } from 'react-bootstrap'
class App extends Component {
  render() {
    return (
      <div className="App">
      <Container>
        <Row xs='2'>
          <Col >
            <Header />
          </Col>
        </Row>
        <Row xs='10'>
          <Col xs="2">
            <SidePanel />
          </Col>
          <Col>
          <Row>
            <Col><Filter /></Col>
          </Row>
          <Row>
            <Col><SheetsCards /></Col>
          </Row>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default App;
