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
                                    <span>Form version identifier: <b>{this.props?.customFields["SpecificFormVersionKEY"]}</b></span>
                                    <br/>
                                    <span>Form identifier: <b>{this.props?.customFields["SpecificFormCU"]}</b></span>
                                    <br/>
                                    <span>Question: <b>{this.props?.customFields["SpecificQuestionQO"]}</b></span>
                                    <br/>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}
