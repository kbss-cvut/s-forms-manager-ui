import React from 'react';
import API from "../../api";
import {SFormsDisplay} from "../SFormsDisplay";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {ContextList} from "./ContextList";


export const DEFAULT_CONTEXT = "http://vfn.cz/ontologies/study-manager/formGen1601802887303";

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
        API.post("/rest/formGen/info/update/batch", null, {
            params: {
                "connectionName": this.props.match.params.connectionName,
                "numberOfUpdates": numberOfUpdates
            }
        }).then(() => {
            console.log("Successfully processed the requested forms.")
        }).catch((error) => {
            console.log(error)
        });
    }

    requestContextsStats() {
        API.get("/rest/formGen/info/contextStats", {
            params: {
                "connectionName": this.props.match.params.connectionName
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
                        Contexts: {this.props.match.params.connectionName}
                    </h4>
                    <br/>
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessBatch()}>
                        Process all non-processed contexts (can take long time and cannot be stopped)
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
                    <span>Processed contexts: <b>{processedContextsInfo}</b></span>
                    <br/>
                    <span>Total contexts: {totalContextsInfo}</span>

                    <br/><br/>
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            <ContextList connectionName={this.props.match.params.connectionName}
                                         filterProcessed={this.state.filterProcessed}
                                         updateActiveContextUri={this.updateActiveContextUri}/>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <SFormsDisplay key={this.state.activeContext}
                                       contextUri={this.state.activeContext}
                                       connectionName={this.props.match.params.connectionName}/>
                    </Col>
                </Row>
            </Container>)
    }
}
