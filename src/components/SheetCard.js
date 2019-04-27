import React, { Component } from 'react'
// import Card from 'react-bootstrap/Card'
import logo from '../assets/logo/logo.png'
import { Card, Row, Col, Icon } from 'antd';
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
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        let dateString = new Date(this.props.sheet.date * 1000).toLocaleDateString("en-US")
        let thumbnail = this.props.sheet.thumbnails || logo;
        if (this.props.isMobile === true) {
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
                >
                    <Row>
                        <Col span={12}>
                            <img alt='example' src={thumbnail} width="100%" height="100%" />
                        </Col>
                        <Col span={12}>
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
                        </Col>
                    </Row>
                </Card>
                </div>
            )
        } else {
            return (
                <div
                    onClick={this.showModal}
                >
                    <SheetCardModal
                        sheet={this.props.sheet}
                        date={dateString}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
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
                                    {this.props.sheet.fileName}
                                </span>}
                            description={
                                <span>
                                    {this.props.sheet.course} {dateString}
                                    <br />
                                    {this.props.sheet.username}
                                    <br />
                                    {this.props.sheet.view || 0} view |
                                    {this.props.sheet.like || 0}<Icon type="like" /> | 
                                    {this.props.sheet.dislike || 0}<Icon type="dislike" />
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