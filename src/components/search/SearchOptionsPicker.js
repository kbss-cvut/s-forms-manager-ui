import React from 'react';
import API from "../../api";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";


export class SearchOptionsPicker extends React.Component {

    constructor() {
        super();
        this.state = {
            query: "",
        }
        this.updateQueryEditor = this.updateQueryEditor.bind(this)
    }

    componentDidMount() {
        this.updateQueryEditor()
    }

    updateQueryEditor(queryId, editorNumber) {
        API.get("/rest/search/updateQuery", {
            params: {
                projectName: this.props.projectName,
                queryId: queryId,
            }
        }).then((response) => {
            this.setState({query: response.data})
            this.props.changeQuery(response.data, editorNumber);
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    getAutocompleteValues() {
        API.get("/rest/search/getAutocomplete", {
            params: {
                projectName: this.props.projectName,
                depth: 0,
                questionOriginPath: "http://vfn.cz/ontologies/fss-form/light-treatment--d-h--size-of-the-tumor--latero-lateral-q-qo"
            }
        }).then((response) => {
            // this.setState({query: response.data})
            // this.props.changeQuery(response.data);
            console.log(response)
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    createEntityUseCaseLine(name, useCaseId) {
        return <div><Row>
            <Col>
                <h5>{name}</h5>
                <Button variant="light"
                        onClick={() => this.updateQueryEditor(useCaseId, 1)}>
                    1
                </Button>
                {' '}
                <Button variant="light"
                        onClick={() => this.updateQueryEditor(useCaseId, 2)}>
                    2
                </Button>
                {' '}
                <Button variant="light"
                        onClick={() => this.updateQueryEditor(useCaseId, 3)}>
                    3
                </Button>
            </Col>
        </Row>
        </div>
    }

    createCustomUseCaseLine(name, descriptionDiv, useCaseId) {
        return <ListGroup.Item>
            <Row>
                <Col xs={10}>
                    <h5>{name}</h5>
                    {descriptionDiv}
                </Col>
                <Col>
                    <Button variant="light"
                            onClick={() => this.updateQueryEditor(useCaseId, 2)}>
                        2
                    </Button>
                    {' '}
                    <Button variant="light"
                            onClick={() => this.updateQueryEditor(useCaseId, 3)}>
                        3
                    </Button>
                </Col>
            </Row>
            <br/>
        </ListGroup.Item>;
    }

    render() {

        return <ListGroup>
            <ListGroup.Item>
                <Row>
                    <Col xs={4} className={"text-left"}>
                        {this.createEntityUseCaseLine("Record", "record")}
                    </Col>
                    <Col xs={4} className={"text-center"}>
                        {this.createEntityUseCaseLine("RecordSnapshot", "record-snapshot")}
                    </Col>
                    <Col xs={4} className={"text-right"}>
                        {this.createEntityUseCaseLine("RecordVersion", "record-version")}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={4} className={"text-left"}>
                        {this.createEntityUseCaseLine("FormTemplate", "form-template")}
                    </Col>
                    <Col xs={4} className={"text-center"}>
                        {this.createEntityUseCaseLine("FormTemplateVersion", "form-template-version")}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={4} className={"text-left"}>
                        {this.createEntityUseCaseLine("QuestionTemplate", "question-template")}
                    </Col>
                    <Col xs={4} className={"text-center"}>
                        {this.createEntityUseCaseLine("QuestionTemplateSnapshot", "question-template-snapshot")}
                    </Col>
                    <Col xs={4} className={"text-right"}>
                        {this.createEntityUseCaseLine("SubmittedAnswer", "submitted-answer")}
                    </Col>
                </Row>
                <br/>
            </ListGroup.Item>


            {this.createCustomUseCaseLine(
                "UC1: any FormTemplateVersion - same answer everytime?",
                <span>For <b>any FormTemplateVersion</b>, what questions have <b>always the same answer</b>?</span>,
                "usecase1"
            )}

            {this.createCustomUseCaseLine(
                "UC2: specific FormTemplateVersion - same answer everytime?",
                <span>For <b>specific FormTemplateVersion</b>, what questions have <b>always the same answer</b>?</span>,
                "usecase2"
            )}

            {this.createCustomUseCaseLine(
                "UC3: 1 answer 1 condition",
                <span>Find records with <b>latest answers</b> conforming <b>1 condition</b>.</span>,
                "usecase3"
            )}

            {this.createCustomUseCaseLine(
                "UC4: 2 answers 2 condition",
                <span>Find records with <b>2 latest answers</b> conforming <b>2 condition</b>.</span>,
                "usecase4"
            )}
        </ListGroup>
    }

}