import React from 'react';
import API from "../../api";
import Form from "react-bootstrap/Form";

export class SearchAutocompleteTextField extends React.Component {

    constructor() {
        super();
        this.getAutocompleteValues = this.getAutocompleteValues.bind(this)
    }

    getJoinedQuestionOrigins() {
        return this.props.questionOrigins.slice(0, this.props.depth + 1).reduce((f, s) => `${f}|${s}`, "").substring(1)
    }

    getAutocompleteValues() {
        API.get("/rest/search/getAutocomplete", {
            params: {
                projectName: this.props.projectName,
                depth: this.props.depth,
                questionOriginPath: this.getJoinedQuestionOrigins()
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
                console.log(error)
                this.setState({showError: true, showSuccess: false}); // todo: improve handling individual messages
            }
        );
    }

    render() {
        return <Form.Control type="text" placeholder="versionKey"
                             onChange={(event) => {
                                 this.props.parentOnChangeCallback(event, this.props.depth);
                                 this.getAutocompleteValues()
                             }}/>
    }
}