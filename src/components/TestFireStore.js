import React, { Component } from 'react';
import firebase from './Firebase';
import { DatePicker } from 'antd';
import Iframe from 'react-iframe';

export default class TestFireStore extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            sid: "",
            users: [],
            sheets: [],
        };
    }
    componentDidMount() {
        firebase
            .firestore()
            .collection("sheets")
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
        const db = firebase.firestore();
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
                    {this.state.sheets.map((sheet, i) => {
                        return (
                            <div key={i}>
                                Sheet Name: {sheet.fileName},
                                Program: {sheet.program},
                                course: {sheet.course},
                                date: {sheet.date},
                                description: {sheet.description},
                                {/* <img src={sheet.url} alt="new" />, */}
                                {/* <FileViewer
                                    fileType={'png'}
                                    filePath={'http://localhost:3000/static/media/logo.992cf29a.png'}
                                    onError={this.onError} /> */}
                                <Iframe url={sheet.url}
                                    width="210px"
                                    height="297px"
                                    id={i}
                                    display="initial"
                                    position="relative"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
