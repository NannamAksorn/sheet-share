import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyHeader from './components/MyHeader'
import UploadPage from './components/UploadPage'
import Home from './components/Home'
// import SheetsCards from './components/SheetCards'
import SidePanel from './components/SidePanel'
import Filter from './components/Filter'
import { Layout } from 'antd';

import { setIsMobile, fetchUser, fetchCourse , setCourse} from './actions'
import { connect } from 'react-redux'
import MyCourse from './components/MyCourse';
// import SignIn from './components/SignIn';

const { Header, Content, Sider } = Layout;

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
    const cachedHits = localStorage.getItem('courses');
    if (cachedHits) {
      console.log("cachedHits")
      this.props.setCourse(JSON.parse(cachedHits));
    } else {
      this.props.fetchCourse();
    }
  }

  state = {
    collapsed: false,
    offsetLeft: 200,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    let contentPadding = '0 50px'
    if (this.props.isMobile === true) {
      contentPadding = '0 0px'
    }
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
            onBreakpoint={(broken) => {
              console.log('onBreak', broken);
              this.props.setIsMobile(broken);
            }}
            onCollapse={(collapsed, type) => {
              collapsed ? this.setState({ offsetLeft: 0 }) : this.setState({ offsetLeft: 200 })
            }}
          >
            <SidePanel />
          </Sider>
          <Content style={{ padding: { contentPadding }, marginTop: 64, marginLeft: `${this.state.offsetLeft}px` }}>
            <Filter />
            <Route exact path="/" component= {Home} />
            <Route path='/upload' component={UploadPage} />
            <Route path='/MyCourse' component={MyCourse} />
          </Content>
        </Layout>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  const { isMobile } = state
  return { isMobile }
}
const mapDispatchToProps = { setIsMobile, fetchUser, fetchCourse , setCourse}
App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default App;
