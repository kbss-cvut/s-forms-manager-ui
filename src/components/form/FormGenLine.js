import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Moment from 'react-moment';
import Collapse from "react-bootstrap/Collapse";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {FormGenHistoryList} from "./FormGenHistoryList";

export class FormGenLine extends React.Component {

    constructor() {
        super();
        this.state = {
            detailCollapseOpen: false,
            historyCollapseOpen: false
        }
    }

    render() {
        const moreThanOneHistory = this.props.numberOfSaves > 1;

        let historyLine;
        if (this.state.historyCollapseOpen) {
            historyLine =
                <FormGenHistoryList saveHash={this.props.saveHash}
                                    connectionName={this.props.connectionName}
                                    clickHandler={this.props.clickHandler}/>;
        }

        let modifiedDiv;
        if (moreThanOneHistory) {
            modifiedDiv = <div>
                <span>Last modified:{' '}
                    <Moment format="DD.MM.YYYY h:mm:ss">
                        {this.props.lastModified}
                    </Moment>
                </span>
            </div>;
        }

        // TODO: add created and modified
        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col xs={9}>
                            <p>
                            </p>
                            <span>Number of saves: <b>{this.props.numberOfSaves}</b>    </span>
                            <br/>
                            <span>Created:{' '}
                                <b>
                                <Moment format="DD.MM.YYYY h:mm:ss">
                                    {this.props.created}
                                </Moment>
                                </b>
                            </span>
                            {modifiedDiv}
                        </Col>
                        <Col xs={3}>
                            <Button variant="outline-primary" type="submit" size="sm" className="float-right"
                                    onClick={() => this.props.clickHandler(this.props.contextUri)}>
                                Display
                            </Button>
                            <Button
                                variant="link" size="sm" className="float-right"
                                onClick={() => this.setState({historyCollapseOpen: !this.state.historyCollapseOpen})}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.historyCollapseOpen}
                                disabled={!moreThanOneHistory}
                            >
                                Show history <FontAwesomeIcon color="black" icon={faCaretDown}/>
                            </Button>
                            <Button
                                variant="link" size="sm" className="float-right"
                                onClick={() => this.setState({detailCollapseOpen: !this.state.detailCollapseOpen})}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.detailCollapseOpen}
                            >
                                Show detail <FontAwesomeIcon color="black" icon={faCaretDown}/>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <Collapse in={this.state.detailCollapseOpen}>
                                    <div id="example-collapse-text">
                                        <hr/>
                                        <span>Context uri: {this.props.contextUri}</span>
                                        <br/>
                                    </div>
                                </Collapse>
                                <Collapse in={this.state.historyCollapseOpen}>
                                    <div id="example-collapse-text">
                                        <hr/>
                                        {historyLine}
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