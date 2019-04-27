import React, { Component } from 'react'
import { Modal, Button, message } from 'antd'
import { db } from './Firebase';
import { connect } from 'react-redux'

class SheetCardModal extends Component {
    componentDidUpdate(){
        if (this.props.visible === true) {
            let docRef = db.collection('sheets').doc(this.props.sheet.id)
            db.runTransaction(function(transaction) {
                return transaction.get(docRef).then(function(doc) {
                    if (doc.exists){
                        let view = doc.data().view || 0
                        transaction.update(docRef, { view: view + 1})
                    }
                })
            }) 

        }
    }
    handleLike = () => {    
        if (this.props.fetchUser && this.props.fetchUser.uid) {
            let feelingRef = db.collection('feeling')
            .doc(`${this.props.sheet.id}.${this.props.fetchUser.uid}`)
            feelingRef.get().then((doc) => {
                if (doc.exists) {
                    switch(doc.data().state){
                        case 1:{
                            message.error("you already liked")
                            return
                        }
                        case -1:{
                            message.success("yay! you liked")
                            let docRef = db.collection('sheets').doc(this.props.sheet.id)
                            db.runTransaction(function(transaction) {
                                return transaction.get(docRef).then(function(doc) {
                                    if (doc.exists){
                                        feelingRef.set({state:1})
                                        let like = doc.data().like || 0
                                        let dislike = doc.data().dislike
                                        transaction.update(docRef, { like: like + 1})
                                        transaction.update(docRef, { dislike: dislike - 1})
                                    }
                                })
                            }) 
                            return
                        }
                        default:{
                            message.error("error")
                            return
                        }
                    }
                } else {
                    message.success("yay! you liked")
                    feelingRef.set({state: 1})
                    let docRef = db.collection('sheets').doc(this.props.sheet.id)
                    db.runTransaction(function(transaction) {
                        return transaction.get(docRef).then(function(doc) {
                            if (doc.exists){
                                let like = doc.data().like || 0
                                transaction.update(docRef, { like: like + 1})
                            }
                        })
                    }) 
                    return
                }
            })
      } else {
        message.error("Please Login")
        return
      }
    }
    handleDislike = () => {    
        if (this.props.fetchUser && this.props.fetchUser.uid) {
            let feelingRef = db.collection('feeling')
            .doc(`${this.props.sheet.id}.${this.props.fetchUser.uid}`)
            feelingRef.get().then((doc) => {
                if (doc.exists) {
                    switch(doc.data().state){
                        case -1:{
                            message.error("you already dislike")
                            return
                        }
                        case 1:{
                            message.success("yay! you disliked")
                            let docRef = db.collection('sheets').doc(this.props.sheet.id)
                            db.runTransaction(function(transaction) {
                                return transaction.get(docRef).then(function(doc) {
                                    if (doc.exists){
                                        feelingRef.set({state:-1})
                                        let like = doc.data().like || 0
                                        let dislike = doc.data().dislike || 0
                                        transaction.update(docRef, { like: like - 1})
                                        transaction.update(docRef, { dislike: dislike + 1})
                                    }
                                })
                            }) 
                            return
                        }
                        default:{
                            message.error("error")
                            return
                        }
                    }
                } else {
                    message.success("yay! you disliked")
                    feelingRef.set({state: -1})
                    let docRef = db.collection('sheets').doc(this.props.sheet.id)
                    db.runTransaction(function(transaction) {
                        return transaction.get(docRef).then(function(doc) {
                            if (doc.exists){
                                let dislike = doc.data().dislike || 0
                                transaction.update(docRef, { dislike: dislike + 1})
                            }
                        })
                    }) 
                    return
                }
            })
      } else {
        message.error("Please Login")
        return
      }
    }

    handleReport = () => {
        if (this.props.fetchUser && this.props.fetchUser.uid) {
            let reportRef = db.collection('report')
            .doc(`${this.props.sheet.id}.${this.props.fetchUser.uid}`)
            reportRef.get().then((doc) => {
                if (doc.exists && doc.data().reported) {
                    message.error("you already Reported this")
                    return
                } else {
                    message.success("Report Submitted")
                    reportRef.set({reported: true})
                    let docRef = db.collection('sheets').doc(this.props.sheet.id)
                    db.runTransaction(function(transaction) {
                        return transaction.get(docRef).then(function(doc) {
                            if (doc.exists){
                                let report = doc.data().report || 0
                                transaction.update(docRef, { report: report + 1})
                            }
                        })
                    }) 
                    return
                }
            })
      } else {
        message.error("Please Login")
        return
      }
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                title={this.props.title}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <b>{this.props.sheet.like || 0}</b>,
                    <Button key="like" icon="like" shape="circle" onClick={this.handleLike}></Button>,
                    <b>{this.props.sheet.dislike || 0}</b>,
                    <Button key="dislike" icon="dislike" shape="circle" onClick={this.handleDislike}></Button>,
                    <Button key="report" type="danger" onClick={this.handleReport}>report</Button>,
                    <Button key="submit" type="primary" onClick={this.props.onOk} href={this.props.sheet.url} target="_blank">Open</Button>,
                ]}
            >
                <img alt='example' src={this.props.sheet.thumbnails} width="100%" height="100%" />
                <p><b>fileName: </b>{this.props.sheet.fileName}</p>
                <p><b>Program: </b>{this.props.sheet.program}</p>
                <p><b>Course: </b>{this.props.sheet.course}</p>
                <p><b>user: </b>{this.props.sheet.username}</p>
                <p><b>date: </b>{this.props.date}</p>
                <p><b>view: </b>{this.props.sheet.view}</p>

            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    const { fetchUser } = state
    return { fetchUser }
  }
  
export default connect(mapStateToProps)(SheetCardModal)
  