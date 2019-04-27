import React, { Component } from 'react'
// import Card from 'react-bootstrap/Card'
import logo from '../assets/logo/logo.png'
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux'
import SheetCardModal from './SheetCardModal';
const { Meta } = Card;

class SheetCard extends Component {
    state = { visible: false }

    showModal = () => {
        if (this.state.visible !== true) {
            this.setState({
                visible: true,
            });
        }
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        let dateString = new Date(this.props.ts * 1000).toLocaleDateString("en-US")

        let thumbnail = this.props.thumbnail || logo;
        if (this.props.isMobile === true) {
            return (
                <Card
                    hoverable
                >
                    <Row>
                        <Col span={12}>
                            <img alt='example' src={thumbnail} width="100%" height="100%" />
                        </Col>
                        <Col span={12}>
                            <Meta
                                title={this.props.name}
                                description={this.props.program}
                            />
                        </Col>
                    </Row>
                </Card>
            )
        } else {
            return (
                <div
                    onClick={this.showModal}
                >
                    <SheetCardModal
                        title={this.props.name}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        thumbnail={thumbnail}
                        course={this.props.course}
                        program={this.props.program}
                        url={this.props.url}
                    />
                    <Card
                        hoverable
                        cover={<img alt='example' src={thumbnail} height="300px" />}
                        style={{ backgroundColor: '#feb6ac', margin: "15px 5px", padding: '5px' }}
                        bodyStyle={{ backgroundColor: "white", padding: "15px" }}
                    >
                        <Meta
                            title={
                                <span style={{ fontSize: "14px" }}>
                                    {this.props.name}
                                </span>}
                            description={
                                <span>
                                    {this.props.course}
                                    <br />
                                    {this.props.username}
                                    <br />
                                    {dateString}
                                </span>
                            }
                        />
                    </Card>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const { isMobile } = state
    return { isMobile }
}
export default connect(mapStateToProps)(SheetCard)