import React from 'react';
import API from "../../api";
import {FormGenView} from "../FormGenView";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {ContextLine} from "./ContextLine";


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
        this.requestGetAllContexts = this.requestGetAllContexts.bind(this)
    }

    componentDidMount() {
        this.requestGetAllContexts();
        this.requestContextsStats();
    }

    updateActiveContextUri(contextUri) {
        this.setState({activeContext: contextUri})
    }

    requestGetAllContexts() {
        API.get("/rest/contexts", {
            params: {
                "connectionName": this.props.match.params.connectionName
            }
        }).then(response => {
            return response.data;
        }).then(data => {
            this.setState({contexts: data});
        });
    }

    requestProcessAll() {
        API.post("/rest/formGen/info/update/all", null, {
            params: {
                "connectionName": this.props.match.params.connectionName
            }
        }).then(() => {
            console.log("Successfully processed all the forms.")
        }).catch((error) => {
            console.log(error)
        });
    }

    requestContextsStats() {
        API.get("/rest/formGen/info/stats", {
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
        let i = 0;
        const contexts = this.state.contexts.filter((context) => {
            if (this.state.filterProcessed) {
                return !context.processed
            } else {
                return true;
            }
        }).map((context) => {
            i++;
            return (
                <ContextLine key={i}
                             context={context}
                             connectionName={this.props.match.params.connectionName}
                             clickHandler={this.updateActiveContextUri}/>);
        });

        let formGenView;
        if (this.state.activeContext) {
            formGenView = <FormGenView key={this.state.activeContext}
                                       contextUri={this.state.activeContext}
                                       connectionName={this.props.match.params.connectionName}>
            </FormGenView>
        } else {
            formGenView = <Alert variant={"light"} className={"h-10"}>
                Context not specified...
            </Alert>
        }

        return (
            <Container fluid>
                <Container>
                    <h4>
                        Contexts: {this.props.match.params.connectionName}
                    </h4>
                    <br/>
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.requestProcessAll()}>
                        Update all non-processed contexts (can take long time)
                    </Button>
                    <hr/>
                    <ToggleButton
                        variant="outline-primary"
                        style={{marginBottom: "0"}}
                        type="checkbox"
                        checked={this.state.filterProcessed}
                        value="1"
                        onChange={e => this.setState({filterProcessed: e.currentTarget.checked})}
                    >
                        {' '}Filter processed
                    </ToggleButton>
                    <br/>
                    <br/>
                    <span>Total contexts: <b>{this.state.contextsStats == null ? "?" : this.state.contextsStats.processedContexts}</b></span>
                    <br/>
                    <span>Processed contexts: {this.state.contextsStats == null ? "?" : this.state.contextsStats.totalContexts}</span>

                    <br/><br/>
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            {contexts}
                        </div>
                    </Col>
                    <Col xs={6}>
                        {formGenView}
                    </Col>
                </Row>
            </Container>)
    }
}
