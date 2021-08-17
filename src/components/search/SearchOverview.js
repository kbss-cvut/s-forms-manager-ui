import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {FormTemplateVersionList} from "../formtemplate/FormTemplateVersionList";
import {ProjectStatistics} from "../form/ProjectStatistics";
import {SearchQueryHelper} from "./SearchQueryHelper";
import {SearchResultList} from "./SearchResultList";
import API from "../../api";
import "@triply/yasgui/build/yasgui.min.css";
import YasguiEditor from "./YasguiEditor";
import {IntelligentQuestionSelector} from "./IntelligentQuestionSelector";
import ToggleButton from "react-bootstrap/ToggleButton";

const LEFT_DISPLAY_VERSIONS_LIST = "DISPLAY_VERSIONS_LIST";
const LEFT_DISPLAY_RECORDS_LIST = "DISPLAY_RECORDS_LIST";
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
            query1: "",
            query2: "",
            query3: "",
            isLoading: false
        }
        this.changeQueryInEditor = this.changeQueryInEditor.bind(this)
        this.runQueryFromEditor = this.runQueryFromEditor.bind(this)
        this.yasguiRef1 = React.createRef();
        this.yasguiRef2 = React.createRef();
        this.yasguiRef3 = React.createRef();
    }

    changeQueryInEditor(query, editorNumber) {
        switch (editorNumber) {
            case 1:
                this.setState({query1: query, rightComponent: RIGHT_DISPLAY_SPARQL_EDITOR})
                break;
            case 3:
                this.setState({query3: query, rightComponent: RIGHT_DISPLAY_SPARQL_EDITOR})
                break;
            case 2:
            default:
                this.setState({query2: query, rightComponent: RIGHT_DISPLAY_SPARQL_EDITOR})
        }
    }

    runQueryFromEditor(editorNumber) {
        this.setState({isLoading: true})

        let query;
        switch (editorNumber) {
            case 1:
                query = this.yasguiRef1.current.state.yasguiEditor.getTab().getQuery();
                break;
            case 3:
                query = this.yasguiRef3.current.state.yasguiEditor.getTab().getQuery();
                break;
            case 2:
            default:
                query = this.yasguiRef2.current.state.yasguiEditor.getTab().getQuery();
                break;
        }

        API.post("/rest/search/runQuery", {
            query: query,
            "projectName": this.props.match.params.projectName
        }).then(response => {
            this.setState({
                searchResults: response.data,
                leftComponent: LEFT_DISPLAY_RECORDS_LIST,
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
            case LEFT_DISPLAY_RECORDS_LIST:
                leftComponent = <SearchResultList projectName={this.props.match.params.projectName}
                                                  updateActiveContextUri={this.updateActiveContextUri}
                                                  searchResults={this.state.searchResults}/>
                break;
            default:
                leftComponent = <div/>
                break;
        }

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
                    {/*        onClick={() => this.setState({leftComponent: LEFT_DISPLAY_RECORDS_LIST})}>*/}
                    {/*    Search in forms*/}
                    {/*</Button>*/}
                    <ToggleButton variant="light" style={{marginBottom: "0"}} type="checkbox"
                                  checked={this.state.displayEditor1}
                                  value="1"
                                  onChange={e => this.setState({displayEditor1: e.currentTarget.checked})}>
                        {' '} Display Editor 1
                    </ToggleButton>
                    {' '}
                    <ToggleButton variant="light" style={{marginBottom: "0"}} type="checkbox"
                                  checked={this.state.displayEditor3}
                                  value="1"
                                  onChange={e => this.setState({displayEditor3: e.currentTarget.checked})}>
                        {' '} Display Editor 3
                    </ToggleButton>
                    <br/>
                    <br/>

                    {this.state.displayEditor1 ?
                        <div><p>Editor 1</p><YasguiEditor editorNumber={1} query={this.state.query1}
                                                          ref={this.yasguiRef1}/></div> : <div/>}
                </Container>
                <Row>
                    <Col xs={6}>
                        <div>
                            <SearchQueryHelper projectName={this.props.match.params.projectName}
                                               changeQuery={this.changeQueryInEditor}
                                               displayEditor1={this.state.displayEditor1}
                                               displayEditor3={this.state.displayEditor3}
                            />
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div>
                            <h5>Question smart search</h5>
                            <IntelligentQuestionSelector projectName={this.props.match.params.projectName}/>
                            <br/><br/>

                            {/*<br/>*/}
                            <p>Editor 2</p>
                            <YasguiEditor editorNumber={2} query={this.state.query2} ref={this.yasguiRef2}/>
                            <br/>
                            {this.state.displayEditor3 ?
                                <div><p>Editor 3</p><YasguiEditor editorNumber={3} query={this.state.query3}
                                                                  ref={this.yasguiRef3}/></div> : <div/>}
                        </div>
                    </Col>
                </Row>
                <br/>
                <div className="text-center">
                    {this.state.displayEditor1 ?
                        <Button variant="outline-primary" type="submit"
                                onClick={() => this.runQueryFromEditor(1)}>
                            Run Query editor 1
                        </Button> : <div/>
                    }
                    {' '}
                    <Button variant="outline-primary" type="submit"
                            onClick={() => this.runQueryFromEditor(2)}>
                        Run Query editor 2
                    </Button>
                    {' '}
                    {this.state.displayEditor3 ?
                        <Button variant="outline-primary" type="submit"
                                onClick={() => this.runQueryFromEditor(3)}>
                            Run Query editor 3
                        </Button> : <div/>
                    }
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
            </Container>
        )
    }
}
