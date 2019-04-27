import React, { Component } from 'react';
import { db } from './Firebase';
import { DatePicker } from 'antd';
// import Iframe from 'react-iframe';
import SheetCard from './SheetCard';
import { Row, Col } from 'antd';
import { connect } from 'react-redux'

class TestFireStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            sid: "",
            users: [],
            sheets: [],
        };
    }
    componentDidMount() {
        db.collection("sheets")
            .get()
            .then(querySnapshot => {
                const sheets = [];
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data())
                    sheets.push(doc.data());
                });
                this.setState({ sheets });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addUser = e => {
        e.preventDefault();
        db.collection('users').add({
            username: this.state.username,
            sid: this.state.sid
        });
        this.setState({
            username: '',
            sid: ''
        });
    };
    onError(e) {
        console.log(e, "file-viewer error")
    }
    iframe = '<iframe src="https://www.example.com/show?data..." width="540" height="450"></iframe>';

    render() {
        let colSpan = 6;
        if(this.props.isMobile === true){
            colSpan = 24;
        }
        return (
            <div>
                <DatePicker />
                <form onSubmit={this.addUser}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        onChange={this.updateInput}
                        value={this.state.username}
                    />
                    <input
                        type='number'
                        name='sid'
                        placeholder='Student ID'
                        onChange={this.updateInput}
                        value={this.state.sid}
                    />
                    <button type="submit">submit</button>
                </form>
                <div>
                    <Row gutter={16}>
                        {this.state.sheets.map((sheet, i) => {
                            return (
                                <Col key={i} span={colSpan}>
                                <SheetCard 
                                    thumbnail={sheet.thumbnails}
                                    name={sheet.fileName}
                                    course={sheet.course}
                                    url={sheet.url}
                                    username={sheet.username || "someone"}
                                    ts={sheet.date}
                                />
                                </Col>
                                // <div key={i}>
                                //     Sheet Name: {sheet.fileName},
                                //     Program: {sheet.program},
                                //     course: {sheet.course},
                                //     date: {sheet.date},
                                //     description: {sheet.description},
                                //     <img src={sheet.thumbnails} alt="new" />
                                //     {/* <Iframe url={sheet.url}
                                //         width="210px"
                                //         height="297px"
                                //         id={i}
                                //         display="initial"
                                //         position="relative"
                                //     /> */}
                                // </div>
                            );
                        })}

                    </Row>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const {isMobile } = state
    return { isMobile }
}
export default connect(mapStateToProps)(TestFireStore)