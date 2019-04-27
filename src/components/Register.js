import React, { Component } from 'react'
import { Upload, Icon, Button, Input, Form, Modal, Spin } from 'antd';
import { connect } from 'react-redux'
import { db } from './Firebase';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends Component {
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let uid = this.props.fetchUser.uid;
                console.log('Received values of form: ', values);
                db.collection('users').doc(uid).set({
                    uid: uid,
                    username: values.userName,
                }).then(
                    this.props.onCancel()
                );

            }
        });
    }
    checkNumUser =  (rule, value, callback) => {
        if (value && value.length > 16){
            callback('Too many Character')
        } else {
            callback()
        }
    }

    checkExistUser = (rule, value, callback) => {
        let query = 1;
        if (value) {
            query = db.collection('users').where("username", "==", value)
                .get().then(querySnapshot => {
                    if (querySnapshot.size !== 0) {
                        callback('Not available')
                    } else {
                        callback()
                    }
                })
        } else {
            callback();
        }
    }

    render() {
        let uid = this.props.fetchUser.uid;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');

        return (
            <Modal
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="back" onClick={this.props.onCancel}>Return</Button>,
                ]}
            >
                <span>
                    <h1>Register New User</h1>
                </span>
                {uid ?
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' },
                                { validator: this.checkExistUser, },
                                { validator: this.checkNumUser }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    : <Spin />
                }
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    const { fetchUser } = state
    return { fetchUser }
}
Register = Form.create({ name: 'register' })(Register);
export default connect(mapStateToProps)(Register);