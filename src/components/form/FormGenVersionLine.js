import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import Collapse from "react-bootstrap/Collapse";
import API from "../../api";

export class FormGenVersionLine extends React.Component {

    constructor() {
        super();
        this.state = {
            collapseOpen: false,
            synonym: "",
            synonymProposal: "",
            synonymChanged: false
        }
    }

    updateVersionSynonym(versionKey, synonym) {
        API.put("/rest/formGenVersion", null, {
            params: {
                "versionKey": versionKey,
                "synonym": synonym
            }
        }).then(response => {
            console.log("!" + synonym + "!")
            this.setState({synonym: synonym, synonymChanged: true})
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        let synonymDiv;
        if ((this.props.synonym && !this.state.synonymChanged) || this.state.synonym) {
            synonymDiv = <div>
                <span>Synonym: <b>{this.state.synonymChanged ? this.state.synonym : this.props.synonym}</b></span>
                <br/>
            </div>;
        }

        return <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                        <Col xs={9}>
                            {synonymDiv}
                            <span>Internal version name: <b>{this.props.versionName}</b></span>
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
                                Show detail <FontAwesomeIcon color="black" icon={faCaretDown}/>
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
                                        <br/>
                                        <br/>
                                        <h6>Synonym</h6>

                                        <InputGroup className="mb-1">
                                            <FormControl
                                                placeholder="Leave out empty and hit Update to remove synonym"
                                                aria-describedby="inputGroup-sizing-sm"
                                                aria-label="Synonym"
                                                aria-describedby="basic-addon2"
                                                value={this.state.synonymProposal}
                                                onChange={e => this.setState({synonymProposal: e.target.value})}
                                            />
                                            <InputGroup.Append>
                                                <Button
                                                    onClick={() => this.updateVersionSynonym(this.props.versionName, this.state.synonymProposal)}
                                                    variant="outline-secondary" size="sm">Update</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
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