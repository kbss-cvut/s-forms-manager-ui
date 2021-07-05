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
                                    <span>Name: <b>{this.props.name}</b> (<a href={this.props.url}
                                                                             target="_blank">link</a>)</span>
                                    <br/>
                                    <span style={{whiteSpace: "pre-line"}}>Description: {this.props.description}</span>
                                    <br/>
                                    <br/>
                                    <span>Form version identifier: <b>{this.props.projectRelations?.relatedForm || "-"}</b></span>
                                    <br/>
                                    <span>Form identifier: <b>{this.props.projectRelations?.relatedFormVersion || "-"}</b></span>
                                    <br/>
                                    <span>Question origin path: {this.props.projectRelations?.relatedQuestionOriginPath || "-"}</span>
                                    <br/>
                                    <span>Question label: <b>{this.props.projectRelations?.relatedQuestionLabel || "-"}</b></span>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}
