import React, { Component } from 'react'
import { Modal, Button } from 'antd'

export default class SheetCardModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.visible}
                title={this.props.title}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="back" onClick={this.props.onCancel}>Return</Button>,
                    <Button key="submit" type="primary" onClick={this.props.onOk} href={this.props.url} target="_blank">Open</Button>,
                ]}
            >
                <img alt='example' src={this.props.thumbnail} width="100%" height="100%" />
                <p>{this.props.program}</p>
                <p>{this.props.course}</p>
            </Modal>
        )
    }
}
