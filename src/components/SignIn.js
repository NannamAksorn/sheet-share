import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../actions'
import { Modal, Button } from 'antd'
import googleButtonImage from '../assets/btn_google_signin_dark_normal.png'
class SignIn extends Component {
    render() {
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
                <h1>Sign In to Sheet Share</h1>
            </span>
                <a
                    className="social-signin"
                    onClick={this.props.signIn}
                >
                    <img
                        alt="sign in with Google"
                        width="200px"
                        src={googleButtonImage}
                    />
                </a>
            </Modal>
        )
    }
}
export default connect(null, { signIn })(SignIn);