import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import Collapse from "react-bootstrap/Collapse";

export class FormGenVersionLine extends React.Component {

    constructor() {
        super();
        this.state = {
            collapseOpen: false
        }
    }

    render() {

        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col xs={9}>
                            <p>
                            </p>
                            <span>Internal version key: <b>{this.props.version}</b></span>
                            <br/>
                            <span>Number of instances: <b>{this.props.numberOfInstances}</b></span>
                            <br/>
                        </Col>
                        <Col xs={3}>
                            <Button variant="outline-primary small" type="submit" size="sm" className="float-right"
                                    onClick={() => this.props.clickHandler(this.props.sampleContextUri)}>
                                Display
                            </Button>
                            <Button
                                variant="link" size="sm" className="float-right"
                                onClick={() => this.setState({collapseOpen: !this.state.collapseOpen})}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.collapseOpen}
                            >
                                <FontAwesomeIcon color="black" icon={faCaretDown}/>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <Collapse in={this.state.collapseOpen}>
                                    <div id="example-collapse-text">
                                        <hr/>
                                        <h6>Sample context URI</h6>
                                        <span>{this.props.sampleContextUri}</span>
                                        <br/>
                                        <br/>
                                        <h6>Internal version URI</h6>
                                        <span>{this.props.internalUri}</span>
                                    </div>
                                </Collapse>
                            </div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}