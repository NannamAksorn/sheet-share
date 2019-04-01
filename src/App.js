import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import SheetsCards from './components/SheetCards'
import SidePanel from './components/SidePanel'
import Filter from './components/Filter'
import TestFireStore from './components/TestFireStore'
import { Container, Row, Col } from 'react-bootstrap'
class App extends Component {
  render() {
    return (
     <div>
       <h1>Test</h1>
      <TestFireStore />
     </div> 
      // <div className="App bg-dark">
      //   <header>
      //     <Header />
      //   </header>
      //   <body className="App-body">
      //     <Filter />
      //     <SheetsCards />
      //   </body>
      //   <div className="App-sidenav bg-dark">
      //     <SidePanel />
      //   </div>
      // </div>
    );
  }
}

export default App;
