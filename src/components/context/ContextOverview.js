import React from 'react';
import API from "../../api";
import {SFormsDisplay} from "../SFormsDisplay";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {ContextList} from "./ContextList";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

export class ContextOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contexts: [],
            activeContext: null,
            filterProcessed: false,
            contextsStats: null
        }
        this.updateActiveContextUri = this.updateActiveContextUri.bind(this)
        this.requestContextsStats = this.requestContextsStats.bind(this)
    }

    componentDidMount() {
        this.requestContextsStats();
    }

    updateActiveContextUri(contextUri) {
        this.setState({activeContext: contextUri})
    }

    requestProcessBatch(numberOfUpdates) {
        if (!numberOfUpdates) {
            numberOfUpdates = 99999;
        }
        API.post("/rest/remote/process/batch", null, {
            params: {
                "projectName": this.props.match.params.projectName,
                "numberOfUpdates": numberOfUpdates
            }
        }).then(() => {
            console.log("Successfully processed the requested forms.")
        }).catch((error) => {
            console.log(error)
        });
    }

    requestContextsStats() {
        API.get("/rest/project/stats/contexts", {
            params: {
                "projectName": this.props.match.params.projectName
            }
        }).then((response) => {
            this.setState({contextsStats: response.data})
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        let processedContextsInfo = "?";
        let totalContextsInfo = "?";
        if (this.state.contextsStats) {
            processedContextsInfo = this.state.contextsStats.processedContexts
            totalContextsInfo = this.state.contextsStats.totalContexts
        }

        return (
            <Container fluid>
                <Container>
                    <br/>
                    <h4>
                        Contexts: {this.props.match.params.projectName}
                    </h4>
                    <br/>
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Process all non-imported record snapshots (can take long time and cannot be stopped)
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch(10)}>
                        Process 10 new
                    </Button>
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch(200)}>
                        Process 200 new
                    </Button>
                    <hr/>
                    <ToggleButton variant="outline-primary" style={{marginBottom: "0"}} type="checkbox"
                                  checked={this.state.filterProcessed}
                                  value="1" onChange={e => this.setState({filterProcessed: e.currentTarget.checked})}>
                        {' '}Filter processed
                    </ToggleButton>
                    <br/>
                    <br/>
                    <div>
                    <span>
                        Total form views{' '}
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">All known form views in the remote formGen
                                repository. 1 Form view corresponds to 1 Record snapshot. </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                        {' '}: <b>{totalContextsInfo}</b>
                    </span>
                        <br/>
                        <span>
                        Processed form views{' '}
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="button-tooltip-2">
                                    Record snapshots that has been processed with s-forms-manager.
                                </Tooltip>}>
                            <FontAwesomeIcon color="grey" icon={faQuestionCircle}/>
                        </OverlayTrigger>
                            {' '}:<b>{processedContextsInfo}</b></span>
                        <br/>
                    </div>
                    <br/><br/>
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            <ContextList projectName={this.props.match.params.projectName}
                                         filterProcessed={this.state.filterProcessed}
                                         updateActiveContextUri={this.updateActiveContextUri}/>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <SFormsDisplay key={this.state.activeContext}
                                       contextUri={this.state.activeContext}
                                       projectName={this.props.match.params.projectName}/>
                    </Col>
                </Row>
            </Container>)
    }
}
