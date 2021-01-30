import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Moment from 'react-moment';

export class FormGenHistoryLine extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {

        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col xs={9}>
                            <p>
                            </p>
                            <span>Version: <b>{this.props.versionName}</b> {this.props.synonym ? "(" + this.props.synonym + ")" : ""}</span>
                            <br/>
                            <span>Created:{' '}
                                <Moment format="DD.MM.YYYY hh:mm:ss">
                                    {this.props.created}
                                </Moment>
                            </span>
                            <br/>
                            <span>Modified:{' '}
                                <b>
                                <Moment format="DD.MM.YYYY hh:mm:ss">
                                    {this.props.modified}
                                </Moment>
                                </b>
                            </span>
                        </Col>
                        <Col xs={3}>
                            <Button variant="outline-primary" type="submit" size="sm" className="float-right"
                                    onClick={() => this.props.clickHandler(this.props.contextUri)}>
                                Display
                            </Button>
                            {' '}
                            <Button
                                variant="outline-primary" size="sm" className="float-right"
                                onClick={() => console.log("versions are supposed to be compared now!")}>
                                Compare to previous version
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}