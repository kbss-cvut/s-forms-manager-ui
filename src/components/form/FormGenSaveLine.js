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

export class FormGenSaveLine extends React.Component {

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
                            <span>Number of saves: <b>{this.props.numberOfSaves}</b>    </span>
                            <br/>
                            <span>Last modified:{' '}
                                <b>
                                <Moment format="DD.MM.YYYY">
                                    {this.props.lastSaved}
                                </Moment>
                                </b>
                            </span>
                            <br/>
                            <span>Context uri: {this.props.contextUri}</span>
                            <br/>
                            <span>Save hash identified: {this.props.saveHash}</span>
                        </Col>
                        <Col xs={3}>
                            <Button variant="outline-primary" type="submit" size="sm" className="float-right"
                                    onClick={() => this.props.clickHandler(this.props.contextUri)}>
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
                        <div>
                            <Collapse in={this.state.collapseOpen}>
                                <div id="example-collapse-text">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                    labore wes anderson cred nesciunt sapiente ea proident.
                                </div>
                            </Collapse>
                        </div>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}