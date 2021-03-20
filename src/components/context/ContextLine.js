import React from "react";
import API from "../../api";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faQuestion, faTimes} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export class ContextLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            processed: false
        }
    }

    requestProcess() {
        this.setState({processing: true});
        API.post("/rest/remote/process/single", null, {
            params: {
                "contextUri": this.props.context.uri,
                "projectName": this.props.projectName
            }
        }).then(() => {
            this.setState({processed: true, processing: false});
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        let optionalProcessButton;
        if (this.props.context.processed) {
            // the context is processed
            optionalProcessButton = <div></div>;
        } else {
            // the context is not processed
            optionalProcessButton = <Button variant="outline-primary" type="submit" size="sm" className="float-right"
                                            onClick={() => this.requestProcess()}> Process</Button>;
        }

        let contextStateIcon;
        if (this.state.processing) {
            contextStateIcon = <FontAwesomeIcon color="yellow" icon={faQuestion}/>
        } else if (this.props.context.processed || this.state.processed) {
            // the context is processed
            contextStateIcon = <FontAwesomeIcon color="green" icon={faCheck}/>
        } else {
            // the context is not processed
            contextStateIcon = <FontAwesomeIcon color="red" icon={faTimes}/>
        }

        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col xs={9}>
                            <p>
                            </p>
                            {this.props.context.uri} {contextStateIcon}
                        </Col>
                        <Col xs={3}>
                            {optionalProcessButton}
                            <Button variant="outline-primary small" type="submit" size="sm" className="float-right"
                                    onClick={() => this.props.clickHandler(this.props.context.uri)}>
                                Display
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    }
}