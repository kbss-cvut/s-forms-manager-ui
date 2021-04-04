import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {FormTemplateVersionList} from "../formtemplate/FormTemplateVersionList";
import {ProjectStatistics} from "../form/ProjectStatistics";
import {SearchOptionsPicker} from "./SearchOptionsPicker";
import {SearchResultList} from "./SearchResultList";
import API from "../../api";
import "@triply/yasgui/build/yasgui.min.css";
import YasguiEditor from "./YasguiEditor";

const LEFT_DISPLAY_VERSIONS_LIST = "DISPLAY_VERSIONS_LIST";
const LEFT_DISPLAY_FORMS_LIST = "DISPLAY_FORMS_LIST";
const RIGHT_DISPLAY_S_FORMS = "RIGHT_DISPLAY_S_FORMS"
const RIGHT_DISPLAY_SPARQL_EDITOR = "RIGHT_DISPLAY_SPARQL_EDITOR"

export class SearchOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contexts: [],
            leftComponent: null,
            rightComponent: null,
            activeContext: null,
            searchResults: [],
            yasguiEditor: null,
            query: "",
            isLoading: false
        }
        this.updateActiveContextUri = this.updateActiveContextUri.bind(this)
        this.changeQueryInEditor = this.changeQueryInEditor.bind(this)
        this.runQueryFromEditor = this.runQueryFromEditor.bind(this)
        this.yasguiRef = React.createRef();
    }

    updateActiveContextUri(contextUri) {
        this.setState({activeContext: contextUri, rightComponent: RIGHT_DISPLAY_S_FORMS})
    }

    changeQueryInEditor(query) {
        this.setState({query: query, rightComponent: RIGHT_DISPLAY_SPARQL_EDITOR})
    }

    runQueryFromEditor() {
        this.setState({isLoading: true})
        API.post("/rest/search/runQuery", {
            query: this.yasguiRef.current.state.yasguiEditor.getTab().getQuery(),
            "projectName": this.props.match.params.projectName
        }).then(response => {
            this.setState({
                searchResults: response.data,
                leftComponent: LEFT_DISPLAY_FORMS_LIST,
                isLoading: false
            })
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        let leftComponent;
        switch (this.state.leftComponent) {
            case LEFT_DISPLAY_VERSIONS_LIST:
                leftComponent = <FormTemplateVersionList projectName={this.props.match.params.projectName}
                                                         updateActiveContextUri={this.updateActiveContextUri}/>
                break;
            case LEFT_DISPLAY_FORMS_LIST:
                leftComponent = <SearchResultList projectName={this.props.match.params.projectName}
                                                  updateActiveContextUri={this.updateActiveContextUri}
                                                  searchResults={this.state.searchResults}/>
                break;
            default:
                leftComponent = <div/>
                break;
        }
        // let rightComponent;
        // switch (this.state.rightComponent) {
        //     default:
        //     case RIGHT_DISPLAY_S_FORMS:
        //         rightComponent = <SFormsDisplay key={this.state.activeContext}
        //                                         contextUri={this.state.activeContext}
        //                                         projectName={this.props.match.params.projectName}/>
        //         break;
        // }

        return (
            <Container fluid>
                <Container>
                    <br/>
                    <h4>
                        Search: {this.props.match.params.projectName}
                    </h4>
                    <ProjectStatistics projectName={this.props.match.params.projectName}/>

                    <hr/>
                    {/*<Button variant="outline-primary" type="submit"*/}
                    {/*        onClick={() => this.setState({leftComponent: LEFT_DISPLAY_FORMS_LIST})}>*/}
                    {/*    Search in forms*/}
                    {/*</Button>*/}
                    <br/><br/>
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            <SearchOptionsPicker projectName={this.props.match.params.projectName}
                                                 changeQuery={this.changeQueryInEditor}/>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div>
                            {/*<br/>*/}
                            <YasguiEditor query={this.state.query} ref={this.yasguiRef}/>
                        </div>
                    </Col>
                </Row>

                <div className="text-center">
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.runQueryFromEditor()}>
                        Run Query
                    </Button>
                    {' '}
                    {this.state.isLoading && <div>Loading...</div>}
                </div>
                <br/>
                <hr/>
                <br/>
                <Row>
                    <Col>
                        <div>
                            {leftComponent}
                        </div>
                    </Col>
                    {/*<Col xs={6}>*/}
                    {/*    {rightComponent}*/}
                    {/*</Col>*/}
                </Row>
            </Container>)
    }
}
