import React from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import API from "../../api";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class SearchOptionsPicker extends React.Component {

    constructor() {
        super();
        this.state = {
            latestSaves: false,
            query: "",
            selectedVersions: [""],
            selectedSaveHashes: [""]
        }
        this.updateQueryEditor = this.updateQueryEditor.bind(this)
    }

    componentDidMount() {
        this.updateQueryEditor()
    }

    updateQueryEditor() {
        API.get("/rest/search/updateQuery", {
            params: {
                connectionName: this.props.connectionName,
                versions: this.state.selectedVersions.reduce((f, s) => `${f},${s}`),
                saveHashes: this.state.selectedSaveHashes.reduce((f, s) => `${f},${s}`),
                latestSaves: this.state.latestSaves
            }
        }).then((response) => {
            this.setState({query: response.data})
            this.props.changeQuery(response.data);
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    handleSelectedVersionChange = idx => evt => {
        let newVersions = this.state.selectedVersions
        newVersions[idx] = evt.target.value
        this.setState({selectedVersions: newVersions});
    };

    handleSelectedSaveHashesChange = idx => evt => {
        let newSaveHashes = this.state.selectedSaveHashes
        newSaveHashes[idx] = evt.target.value
        this.setState({selectedSaveHashes: newSaveHashes});
    };


    handleAddSelectedVersion = () => {
        this.setState({
            selectedVersions: this.state.selectedVersions.concat("")
        });
    };

    handleAddSelectedSaveHashes = () => {
        this.setState({
            selectedSaveHashes: this.state.selectedSaveHashes.concat("")
        });
    };

    render() {

        let selectedVersionControls = this.state.selectedVersions.map((v, idx) => (
            <Form.Control type="text" placeholder="version or version synonym" key={idx}
                          onChange={this.handleSelectedVersionChange(idx)}/>
        ));
        let selectedSaveHashControls = this.state.selectedSaveHashes.map((v, idx) => (
            <Form.Control type="text" placeholder="saveHash" key={idx}
                          onChange={this.handleSelectedSaveHashesChange(idx)}/>
        ));

        console.log(this.state.selectedSaveHashes)

        return <div>
            <Form>
                <Row>
                    <Col xs={6}>

                        <Form.Group controlId="formVersionFilter">
                            <Form.Label>
                                Select only specific version of forms

                                <Button
                                    variant="link" size="sm" className="float-right"
                                    onClick={this.handleAddSelectedVersion}>
                                    <FontAwesomeIcon style={{position: "absolute"}} color="blue" icon={faPlus}/>
                                </Button>

                            </Form.Label>

                            {selectedVersionControls}

                            <Form.Text className="text-muted">
                                Filter by version
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Include only latest saves in the result // TODO"
                                        onChangeCapture={e => {
                                            this.setState({latestSaves: e.currentTarget.checked})
                                        }}/>
                        </Form.Group>

                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId="formSaveHashFilter">
                            <Form.Label>Select specific form and it's history
                                <Button
                                    variant="link" size="sm" className="float-right"
                                    onClick={this.handleAddSelectedSaveHashes}>
                                    <FontAwesomeIcon style={{position: "absolute"}} color="blue" icon={faPlus}/>
                                </Button>
                            </Form.Label>

                            {selectedSaveHashControls}

                            <Form.Text className="text-muted">
                                Filter by saveHash
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={() => this.updateQueryEditor()}>
                    Update SPARQL
                </Button>
            </Form>
        </div>;
    }
}