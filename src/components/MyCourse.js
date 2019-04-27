import React, { Component } from 'react';
import { db } from './Firebase';
import { DatePicker } from 'antd';
// import Iframe from 'react-iframe';
import SheetCard from './SheetCard';
import { Row, Col } from 'antd';
import { connect } from 'react-redux'

class MyCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            sid: "",
            users: [],
            sheets: [],
        };
    }
    componentDidMount(){
        if(this.props.fetchUser.uid){
            db.collection('users').doc(this.props.fetchUser.uid).get().then(doc => {
                db.collection("sheets")
                    .where('username', '==', doc.data().username)
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
                })
        }

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
                <h1>My Course</h1>
                <div>
                    <Row gutter={16}>
                        {this.state.sheets.map((sheet, i) => {
                            return (
                                <Col key={i} span={colSpan}>
                                <SheetCard
                                    sheet={sheet}
                                />
                                </Col>
                            );
                        })}

                    </Row>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const {isMobile, fetchUser } = state
    return { isMobile, fetchUser }
}
export default connect(mapStateToProps)(MyCourse)