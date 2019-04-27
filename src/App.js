import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyHeader from './components/MyHeader'
import UploadPage from './components/UploadPage'
import SheetsCards from './components/SheetCards'
import SidePanel from './components/SidePanel'
import Filter from './components/Filter'
import TestFireStore from './components/TestFireStore'
import { Layout, Switch } from 'antd';
const { Header, Content, Sider } = Layout;
class App extends Component {
  state = {
    collapsed: false,
    offsetLeft: 200,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <MyHeader />
          </Header>
          <Sider
            style={{ position: 'fixed', zIndex: 1, marginTop: 64, height: '100vh' }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { console.log(broken); }}
            onCollapse={(collapsed, type) => {
              collapsed ? this.setState({ offsetLeft: 0 }) : this.setState({ offsetLeft: 200 })
            }}
          >
            <SidePanel />
          </Sider>
          <Content style={{ padding: '0 50px', marginTop: 64, marginLeft: `${this.state.offsetLeft}px` }}>
            <Filter />
            <Route exact path='/' component={SheetsCards} />
            <Route path='/upload' component={UploadPage} />
            <Route path='/test' component={TestFireStore} />
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;
