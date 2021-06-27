import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

export class TicketLine extends React.Component {

    render() {


        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div>
                        <Row>
                            <Col>
                                <div>
                                    <span>Name: <b>{this.props.name}</b></span>
                                    <br/>
                                    <span>Description: {this.props.description}</span>
                                    <br/>
                                    <br/>
                                    <span>Link: <a href={this.props.url} target="_blank">link</a></span>
                                    <br/>
                                    <span>Form version identifier: <b>{this.props.relations?.relatedForm}</b></span>
                                    <br/>
                                    <span>Form identifier: <b>{this.props.relations?.relatedFormVersion}</b></span>
                                    <br/>
                                    <span>Question origin path: {this.props.relations?.relatedQuestionOriginPath}</span>
                                    <br/>
                                    <span>Question label: <b>{this.props.relations?.relatedQuestionLabel}</b></span>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}
